import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  client_url: process.env.CLIENT_BASE_URL,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  accessToken: process.env.ACCESS_TOKEN,
  paymentUrl: process.env.PAYMENT_URL,
  paymentVerifyUrl: process.env.PAYMENT_VERIFY_URL,
  storeId: process.env.STORE_ID,
  signatureKey: process.env.SIGNATURE_KEY,
};
