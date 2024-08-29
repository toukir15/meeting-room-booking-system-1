"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const slot_validation_1 = require("./slot.validation");
const slot_controller_1 = require("./slot.controller");
const auth_1 = require("../../middlewares/auth");
const user_const_1 = require("../user/user.const");
const router = express_1.default.Router();
router.post('/', (0, auth_1.auth)(user_const_1.USER_ROLE.admin), (0, validateRequest_1.validateRequest)(slot_validation_1.SlotValidations.createSlotValidationSchema), slot_controller_1.SlotControllers.createSlot);
router.get('/availability', slot_controller_1.SlotControllers.getAvailableAllSlot);
exports.SlotRouter = router;
