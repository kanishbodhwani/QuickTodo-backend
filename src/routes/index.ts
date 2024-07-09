import express from 'express';
import healthRouter from './health.js';
import usersRouter from './users.js';

const app = express.Router();

app.use('/health', healthRouter);
app.use('/', usersRouter);

export default app;
