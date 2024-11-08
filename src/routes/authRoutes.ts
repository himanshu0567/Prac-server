import { Router } from 'express';
import { getUserLanguage, login, register } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user/language', authenticateJWT, getUserLanguage);

export default router;
