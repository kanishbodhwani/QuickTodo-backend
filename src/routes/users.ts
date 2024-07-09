import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserWithId,
  updateUser,
  deleteUser
} from '../controllers/users.js';
import { createOrUpdateUser } from '../middlewares/validators';

const router = Router();

router.get('/', getUsers);
router.post('/', createOrUpdateUser, createUser);
router.get('/:id', getUserWithId);
router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
