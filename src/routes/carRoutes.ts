import express from 'express';
import { createCar, listCars } from '../controllers/carController';

const router = express.Router();

router.post('/create', createCar);
router.get('/list', listCars);

export default router;