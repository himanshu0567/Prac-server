import { Request, Response } from 'express';
import prisma from '../prisma';
import { translateToLanguages } from '../utils/translationService';

export const createCar = async (req: Request, res: Response) => {
  const { image, name, description, price } = req.body;

  try {
    const { hindi: name_hi, spanish: name_es } = await translateToLanguages(name);
    const { hindi: description_hi, spanish: description_es } = await translateToLanguages(description);

    const car = await prisma.car.create({
      data: {
        image,
        name_en: name,
        name_hi,
        name_es,
        description_en: description,
        description_hi,
        description_es,
        price,
      },
    });

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: 'Error creating car' });
  }
};

export const listCars = async (req: Request, res: Response) => {
  const language = req.query.language || 'en';

  const selectFields = {
    image: true,
    price: true,
    [`name_${language}`]: true,
    [`description_${language}`]: true,
  };

  try {
    const cars = await prisma.car.findMany({ select: selectFields });
    res.status(200).json(cars.map(car => ({
      ...car,
      name: car[`name_${language}`],
      description: car[`description_${language}`],
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching cars' });
  }
};
