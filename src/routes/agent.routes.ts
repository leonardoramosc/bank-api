import { Router } from 'express';
import { getAllAgents } from '../controllers/agent.controller';
import { authorize } from '../utils/authorize';

const router = Router();

router.get('', authorize(['manager']), getAllAgents);

export default router;