import jwt from 'jsonwebtoken';

const generateToken = (email: string) => {
  return jwt.sign({ email }, 'your_jwt_secret', { expiresIn: '1h' });
};

export { generateToken };
