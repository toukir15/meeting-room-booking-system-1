"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '/.env') });
exports.default = {
    database_url: process.env.DATABASE_URL,
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
    secret_key: process.env.SECRET_KEY,
    cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    client_url: process.env.CLIENT_URL,
    stripe_cli: process.env.STRIPE_CLI,
    stripe_endpoint_secret: process.env.STRIPE_ENDPOINT_SECRET,
};
