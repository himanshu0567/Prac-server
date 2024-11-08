import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import middleware from 'i18next-http-middleware';
import i18n from './i18n';
import authRoutes from './routes/authRoutes';
import carRoutes from './routes/carRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: ['*'],
}));
app.use(
  middleware.handle(i18n)
);
app.use((req, res, next) => {
  const lang = req.body.language || req.query.language || 'en';
  req.i18n.changeLanguage(lang).then(() => {
    next();
  }).catch(err => {
    console.error('Error changing language:', err);
    next(err);
  });
});

app.use('/auth', authRoutes);
app.use('/cars', carRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
