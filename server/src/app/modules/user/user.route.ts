import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.createUser,
);

router.get('/', UserControllers.getUsers);
router.post('/:id', UserControllers.updateUser);

export const UserRouter = router;
