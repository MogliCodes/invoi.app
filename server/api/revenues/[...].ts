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
    const body = await readBody(event);

    const apiClient = new ApiClientBuilder();
    return await apiClient
      .setResource("invoice")
      .setEndpoint("revenues/year")
      .setHeaders(headers)
      .setBody(body)
      .get()
      .execute();
  })
);

router.post(
  "/client/:clientId",
  defineEventHandler(async (event: H3Event) => {
    console.log("revenues/client/:clientId");
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const body = await readBody(event);
    const params = getRouterParams(event);
    console.log("clientId", params.clientId);
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .setResource("invoice")
      .setEndpoint(`revenue/${params.clientId}`)
      .setHeaders(headers)
      .setBody(body)
      .get()
      .execute();
  })
);

export default useBase("/api/revenues", router.handler);
