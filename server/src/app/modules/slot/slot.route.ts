import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';
import { SlotControllers } from './slot.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
const router = express.Router();

router.post(
  '/',
  auth([USER_ROLE.admin]),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot,
);
router.get(
  '/availability',
  auth([USER_ROLE.admin, USER_ROLE.user]),
  SlotControllers.getAvailableAllSlot,
);
router.get(
  '/',
  auth([USER_ROLE.admin, USER_ROLE.user]),
  SlotControllers.getSlots,
);
router.delete('/:slotId', auth([USER_ROLE.admin]), SlotControllers.deleteSlot);
router.patch('/:slotId', auth([USER_ROLE.admin]), SlotControllers.updateSlot);

export const SlotRouter = router;
