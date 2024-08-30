import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // If no token, unauthorized

  jwt.verify(token, 'nikki0623', (err, user) => {
    if (err) return res.sendStatus(403); // If token invalid, forbidden

    req.user = user;
    next();
  });
};
