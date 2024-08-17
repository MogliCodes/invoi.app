import { H3Event } from "h3";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const accessToken = getCookie(event, "accessToken");
  const jwtSecret = config.secretKey; // Use environment variable for production

  if (!accessToken) {
    return { valid: false, error: "No token provided" };
  }

  try {
    const decodedToken = jwt.verify(accessToken, jwtSecret);
    return { valid: true, decodedToken };
  } catch (error) {
    return { valid: false, error: "Invalid or expired token" };
  }
});
