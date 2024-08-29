"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRouter = void 0;
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("./room.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const room_validation_1 = require("./room.validation");
const auth_1 = require("../../middlewares/auth");
const user_const_1 = require("../user/user.const");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.post('/', 
// auth(USER_ROLE.admin),
// validateRequest(RoomValidations.createRoomValidationSchema),
sendImageToCloudinary_1.upload.array('rooms'), room_controller_1.RoomControllers.createRoom);
router.get('/', room_controller_1.RoomControllers.getAllRooms);
router.get('/:id', room_controller_1.RoomControllers.getSingleRoom);
router.put('/:id', (0, auth_1.auth)(user_const_1.USER_ROLE.admin), (0, validateRequest_1.validateRequest)(room_validation_1.RoomValidations.updateRoomValidationSchema), room_controller_1.RoomControllers.updateRoom);
router.delete('/:id', (0, auth_1.auth)(user_const_1.USER_ROLE.admin), (0, validateRequest_1.validateRequest)(room_validation_1.RoomValidations.updateRoomValidationSchema), room_controller_1.RoomControllers.deleteRoom);
exports.RoomRouter = router;
