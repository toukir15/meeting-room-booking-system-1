import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { SlotValidations } from './slot.validation';
import { SlotControllers } from './slot.controller';
// import { auth } from '../../middlewares/auth';
// import { USER_ROLE } from '../user/user.const';
const router = express.Router();

router.post(
  '/',
  // auth(USER_ROLE.admin),
  validateRequest(SlotValidations.createSlotValidationSchema),
  SlotControllers.createSlot,
);
router.get('/availability', SlotControllers.getAvailableAllSlot);
router.get('/', SlotControllers.getSlots);
router.delete('/:slotId', SlotControllers.deleteSlot);
router.patch('/:slotId', SlotControllers.updateSlot);

export const SlotRouter = router;
