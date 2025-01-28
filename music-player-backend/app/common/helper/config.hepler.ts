import dotenv from "dotenv";
import process from "process";
import path from "path";

/**
 * Loads environment variables from a `.env` file based on the current
 * `NODE_ENV` environment variable. If `NODE_ENV` is not set, it defaults to
 * "development".
 *
 * @example
 * // If NODE_ENV is set to "production"
 * loadConfig() // loads .env.production
 *
 * @example
 * // If NODE_ENV is not set
 * loadConfig() // loads .env.development
 */
export const loadConfig = () => {
  const env = process.env.NODE_ENV ?? "development";
  const filepath = path.join(process.cwd(), `.env.${env}`);
  dotenv.config({ path: filepath });
};
