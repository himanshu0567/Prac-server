import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    req.body.user = user;
    next();
  });
};
