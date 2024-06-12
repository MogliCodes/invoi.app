import { createRouter, defineEventHandler, H3Event, useBase } from "h3";
import ApiClientBuilder from "~/server/utils/apiClientBuilder";
const router = createRouter();

router.get(
  "/",
  defineEventHandler(async (event: H3Event) => {
    console.log("GET /api/services");
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    const response = await apiClient
      .get()
      .setResource("services")
      .setHeaders(headers)
      .execute();
    return response.data;
  })
);

export default useBase("/api/services", router.handler);
