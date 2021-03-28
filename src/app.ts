import express, { Request, Response } from 'express';
import cors from 'cors';

import { errorHandler } from './utils/errorHandler';

import authRoutes from './routes/auth.routes';
import agentRoutes from './routes/agent.routes';

const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req: Request, res: Response) => {
  res.json(`API servin on port: ${app.get('port')}`)
});

app.use('/api', authRoutes);
app.use('/api/agents', agentRoutes);

// global error handler
app.use(errorHandler)

export default app;