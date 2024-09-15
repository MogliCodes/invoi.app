import { createRouter, H3Event, useBase } from "h3";
import ApiClientBuilder from "~/server/utils/apiClientBuilder";

const router = createRouter();

router.post(
  "/get",
  defineEventHandler(async (event: H3Event) => {
    const cookies = parseCookies(event);
    const body = await readBody(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .get()
      .setResource("invoice/template")
      .setHeaders(headers)
      .setBody(body)
      .execute();
  })
);

export default useBase("/api/templates", router.handler);
