"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: 1, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
});
// 3. Create a Model.
exports.User = (0, mongoose_1.model)('User', userSchema);
