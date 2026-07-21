import { Router } from 'express';
import { getUsers,getUser,getAssignments} from '../controllers/user.controller.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/:id/assignments', getAssignments);

export default router;