"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const stripe_1 = __importDefault(require("stripe"));
const slot_model_1 = require("../slot/slot.model");
const appError_1 = require("../../errors/appError");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const stripe = new stripe_1.default(config_1.default.stripe_cli);
const createPaymentSession = (bookingData) => __awaiter(void 0, void 0, void 0, function* () {
    // find slot
    const findSlot = yield slot_model_1.Slot.findOne({
        date: bookingData.date,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
    });
    const bookingCollectionData = {
        date: bookingData.date,
        slot: findSlot === null || findSlot === void 0 ? void 0 : findSlot._id,
        user: bookingData.user,
        room: bookingData.room,
    };
    if (!findSlot) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Slot not availabled');
    }
    // Step 1: Create a Product
    const product = yield stripe.products.create({
        name: `Room Booking for ${bookingData.roomName}`,
        description: `Booking on ${bookingData.date} from ${bookingData.startTime} to ${bookingData.endTime}`,
    });
    // Step 2: Create a Price
    const price = yield stripe.prices.create({
        unit_amount: Number(bookingData.pricePerSlot), // Update the amount as needed
        currency: 'usd',
        product: product.id,
    });
    // Step 3: Create a Checkout Session
    const session = yield stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price: price.id,
                quantity: 1,
            },
        ],
        customer_email: bookingData.email,
        metadata: {
            phone: bookingData.phone,
            startTime: bookingData.startTime,
            endTime: bookingData.endTime,
            slotId: String(findSlot._id),
            bookingData: JSON.stringify(bookingCollectionData),
        },
        success_url: `${config_1.default.client_url}/payment-success`,
        cancel_url: config_1.default.client_url,
    });
    return session;
});
exports.PaymentService = {
    createPaymentSession,
};
