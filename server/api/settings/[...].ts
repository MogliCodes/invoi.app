import { createRouter, defineEventHandler, H3Event, useBase } from "h3";
import ApiClientBuilder from "~/server/utils/apiClientBuilder";
const router = createRouter();

router.post(
  "/get",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/settings/get");
    const cookies = parseCookies(event);
    const headers = {
      userid: cookies.userId,
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

router.post(
  "/init",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/settings/init");
    const cookies = parseCookies(event);
    const headers = {
      userid: cookies.userId,
      authorization: cookies.accessToken,
    };
    const body = await readBody(event);
    console.log("body", body);
    const apiClient = new ApiClientBuilder();
    const res = await apiClient
      .post()
      .setResource("settings")
      .setBody(body)
      .setHeaders(headers)
      .execute();
    console.log("res", res);
    return res;
  })
);

router.patch(
  "/",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/settings/get");
    const cookies = parseCookies(event);
    const headers = {
      userid: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .patch()
      .setHeaders(headers)
      .setResource("settings")
      .execute();
  })
);

export default useBase("/api/settings", router.handler);
