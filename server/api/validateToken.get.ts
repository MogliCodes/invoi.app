import { H3Event } from "h3";
import jwt from "jsonwebtoken";
import consola from "consola";

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig();
  const accessToken = getCookie(event, "accessToken");
  const jwtSecret = config.secretKey;

  console.log("Access token", accessToken);

  if (!accessToken) {
    return { valid: false, error: "No token provided" };
  }

  try {
    const decodedToken = jwt.verify(accessToken, jwtSecret);
    console.log("Decoded token", decodedToken);
    return { valid: true, decodedToken };
  } catch (error) {
    consola.error("JWT Verification Error:", error);
    return { valid: false, error: "Invalid or expired token" };
  }
});
