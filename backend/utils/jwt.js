import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return { isValid: false };
    else return { isValid: true, decoded };
  });
};

const decodeToken = (token) => {
  return jwt.decode(token);
};

export { generateToken, verifyToken, decodeToken };
