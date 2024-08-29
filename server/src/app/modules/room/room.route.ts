import express from 'express';
import { RoomControllers } from './room.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { RoomValidations } from './room.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.const';
import { upload } from '../../utils/sendImageToCloudinary';
const router = express.Router();

router.post(
  '/',
  // auth(USER_ROLE.admin),
  // validateRequest(RoomValidations.createRoomValidationSchema),
  upload.array('rooms'),
  RoomControllers.createRoom,
);
router.get('/', RoomControllers.getAllRooms);
router.get('/:id', RoomControllers.getSingleRoom);
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(RoomValidations.updateRoomValidationSchema),
  RoomControllers.updateRoom,
);
router.delete(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(RoomValidations.updateRoomValidationSchema),
  RoomControllers.deleteRoom,
);

export const RoomRouter = router;
