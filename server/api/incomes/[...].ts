import { createRouter, defineEventHandler, H3Event, useBase } from "h3";
import ApiClientBuilder from "~/server/utils/apiClientBuilder";
const router = createRouter();

router.post(
  "/isc",
  defineEventHandler(async (event: H3Event) => {
    const query = getQuery(event);
    const body = await readBody(event);
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies?.userId,
      authorization: cookies.accessToken,
    };
    console.log("params", query);
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .post()
      .setBody(body)
      .setResource("income")
      .setEndpoint("isc")
      .setHeaders(headers)
      .execute();
  })
);

export default useBase("/api/incomes", router.handler);
