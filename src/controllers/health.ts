import { Request, Response } from 'express';

const checkHealth = (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: 'OK - User Service', uptime: process.uptime() });
};

export default { checkHealth };
