"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRouter = void 0;
const express_1 = __importDefault(require("express"));
const room_controller_1 = require("./room.controller");
const auth_1 = require("../../middlewares/auth");
const user_const_1 = require("../user/user.const");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)([user_const_1.USER_ROLE.admin]), 
// validateRequest(RoomValidations.createRoomValidationSchema),
sendImageToCloudinary_1.upload.array('file'), room_controller_1.RoomControllers.createRoom);
router.get('/', (0, auth_1.auth)([user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.user]), room_controller_1.RoomControllers.getAllRooms);
router.get('/:id', room_controller_1.RoomControllers.getSingleRoom);
router.patch('/:id', 
// auth(USER_ROLE.admin),
// validateRequest(RoomValidations.updateRoomValidationSchema),
room_controller_1.RoomControllers.updateRoom);
router.delete('/:id', 
// auth(USER_ROLE.admin),
// validateRequest(RoomValidations.updateRoomValidationSchema),
room_controller_1.RoomControllers.deleteRoom);
exports.RoomRouter = router;
