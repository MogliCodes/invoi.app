import { createRouter, defineEventHandler, H3Event, useBase } from "h3";
import ApiClientBuilder from "~/server/utils/apiClientBuilder";

const router = createRouter();

router.post(
  "/revenues/get",
  defineEventHandler(async (event: H3Event) => {
    console.log("revenues/get");
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };

    const apiClient = new ApiClientBuilder();
    return await apiClient
      .setResource("invoice")
      .setEndpoint("revenues/year")
      .setHeaders(headers)
      .get()
      .execute();
  })
);

export default useBase("/api/revenues", router.handler);
