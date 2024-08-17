import consola from "consola";
import jwt, { type JwtPayload } from "jsonwebtoken";

type Response = {
  data: {
    token: string;
  };
};

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const body = await readBody(event);
  try {
    const response: Response = await $fetch(
      `${backendBaseUrl}/restapi/auth/login`,
      {
        method: "POST",
        body,
      }
    );

    // decode token from response
    const token = response.data.token;
    const secret = process.env.SECRET_KEY || "";
    const decoded: jwt.JwtPayload = jwt.verify(token, secret) as JwtPayload;
    const { exp = 0 } = decoded;
    const formattedExpirationDate = new Date(exp * 1000).toISOString();
    // Time to expiration
    const now = new Date();
    const expirationDate = new Date(exp * 1000);
    const timeToExpiration = expirationDate.getTime() - now.getTime();
    // Time to expiration formatted
    const seconds = Math.floor((timeToExpiration / 1000) % 60);
    const minutes = Math.floor((timeToExpiration / (1000 * 60)) % 60);
    const hours = Math.floor((timeToExpiration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeToExpiration / (1000 * 60 * 60 * 24));
    const formattedTimeToExpiration = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;

    console.log("decoded", decoded);
    console.log("formattedExpirationDate", formattedExpirationDate);
    console.log("timeToExpiration", timeToExpiration);
    console.log("formattedTimeToExpiration", formattedTimeToExpiration);
    return { response, timeToExpiration };
  } catch (error) {
    return error;
  }
});
