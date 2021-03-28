import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Role } from '../database/models/agents';

import config from '../config/config';

export const authorize = (roles: Role[]) => (req: Request, res: Response, next: NextFunction) => {

  const token = req.header('auth-token');

  if(!token) {
    return res.status(400).send('Invalid token');
  }

  const verified = jwt.verify(token, config.jwtSecret) as any;

  if (!roles.includes(verified.role)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();

}