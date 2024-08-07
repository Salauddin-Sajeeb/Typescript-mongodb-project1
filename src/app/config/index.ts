import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  bcrypt_salt_round:process.env.BYCRPT_SALT_ROUND,
  default_pass:process.env.DEFAULT_PASS

};
