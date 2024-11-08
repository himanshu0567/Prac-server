import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import prisma from '../prisma';
import { generateToken } from '../utils/jwtUtils';
import i18n from '../i18n';
import middleware from 'i18next-http-middleware';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, language } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    const message = req.t('User_already_exists')
    res.status(400).json({ message });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      language,
    },
  });
  res.status(201).json({data: { message: req.t('User_registered_successfully'), user: { id: user.id, email: user.email, name: user.name, language: user.language } }});
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) {
    const message = req.t('Invalid_credentials')
    res.status(401).json({ message });
    return;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const message = req.t('Invalid_credentials')
    res.status(401).json({ message });
    return;
  }

  const token = generateToken(email);
  res.status(200).json({data: { token, user: { id: user.id, email: user.email, name: user.name, language: user.language } }});
};

export const getUserLanguage = async (req: Request, res: Response): Promise<void> => {
  const email = req.body.user.email;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user) {
    res.json({ language: user.language });
  } else {
    const message = req.t('User_not_found')
    res.status(401).json({ message });
  }
};
