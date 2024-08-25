import jwt from 'jsonwebtoken';

const secretKey = 'nikki0623'; // Should match the key used for signing

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (token == null) return res.sendStatus(401); // If no token, respond with 401

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // If token is invalid, respond with 403
        req.user = user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    });
};
