import express from 'express';
import {registerUser,getAllUsers,getUserByID,deleteUser} from '../controllers/userController.js';

const router = express.Router();
router.post('/register', registerUser);
router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.delete('/:id', deleteUser);

export default router;
