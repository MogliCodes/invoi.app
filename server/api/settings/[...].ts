import { createRouter, defineEventHandler, H3Event, useBase } from "h3";
import ApiClientBuilder from "~/server/utils/apiClientBuilder";
const router = createRouter();

router.post(
  "/get",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/settings/get");
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .get()
      .setResource("settings")
      .setHeaders(headers)
      .execute();
  })
);

export default useBase("/api/settings", router.handler);
