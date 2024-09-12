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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = require("./app/middlewares/notFound");
const body_parser_1 = __importDefault(require("body-parser"));
const stripe_1 = __importDefault(require("stripe"));
const slot_model_1 = require("./app/modules/slot/slot.model");
const appError_1 = require("./app/errors/appError");
const http_status_1 = __importDefault(require("http-status"));
const booking_model_1 = require("./app/modules/booking/booking.model");
const config_1 = __importDefault(require("./app/config"));
const app = (0, express_1.default)();
const stripe = new stripe_1.default(config_1.default.stripe_cli);
app.use((0, cors_1.default)({ origin: [config_1.default.client_url], credentials: true }));
app.use(express_1.default.urlencoded({ extended: true }));
// application routes
app.use('/api', express_1.default.json(), routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post('/webhook', body_parser_1.default.raw({ type: 'application/json' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers['stripe-signature'];
    let event;
    console.log(req.body);
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, config_1.default.stripe_endpoint_secret);
    }
    catch (err) {
        throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, 'Webhook Error');
    }
    // Handle the event
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const bookingData = JSON.parse(session.metadata.bookingData);
        const slotId = session.metadata.slotId;
        try {
            // update slot status
            yield slot_model_1.Slot.findByIdAndUpdate(slotId, {
                isBooked: true,
            }, { new: true });
            // create booking
            if (bookingData) {
                yield booking_model_1.Booking.create(bookingData);
            }
        }
        catch (err) {
            throw new appError_1.AppError(http_status_1.default.BAD_REQUEST, `Failed to find slot for booking ID ${slotId}:`);
        }
    }
    else {
        console.log(`Unhandled event type ${event.type}`);
    }
    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
}));
app.use(globalErrorHandler_1.globalErrorHandler);
// Not found route
app.use(notFound_1.notFound);
exports.default = app;
