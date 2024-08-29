import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '/.env') });

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  secret_key: process.env.SECRET_KEY,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};
