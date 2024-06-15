import { createRouter, defineEventHandler, H3Event, useBase } from "h3";
import ApiClientBuilder from "~/server/utils/apiClientBuilder";

const router = createRouter();

router.post(
  "/get",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/time-records/get");
    const cookies = parseCookies(event);
    console.log(cookies.userId);
    const body = await readBody(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .get()
      .setResource("time-records")
      .setHeaders(headers)
      .setBody(body)
      .execute();
  })
);

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/time-records");
    const cookies = parseCookies(event);
    const body = await readBody(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .post()
      .setResource("time-records")
      .setHeaders(headers)
      .setBody(body)
      .execute();
  })
);

export default useBase("/api/time-records", router.handler);
//   })
