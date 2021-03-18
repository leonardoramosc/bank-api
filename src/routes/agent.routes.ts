import { Router } from 'express';
import { getAllAgents } from '../controllers/agent.controller';

const router = Router();

router.get('', getAllAgents);

export default router;