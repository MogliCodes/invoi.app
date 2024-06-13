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
    return response?.data;
  })
);

router.post(
  "/delete",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/services/delete");
    const cookies = parseCookies(event);
    const body = await readBody(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .post()
      .setResource("services/delete")
      .setHeaders(headers)
      .setBody(body)
      .execute();
  })
);

// router.post(
//   "(/delete",
//   defineEventHandler(async (event: H3Event) => {
//     console.log("POST /api/services/delete");
//     const cookies = parseCookies(event);
//     const body = await readBody(event);
//     const headers = {
//       userId: cookies.userId,
//       authorization: cookies.accessToken,
//     };
//     const apiClient = new ApiClientBuilder();
//     return await apiClient
//       .post()
//       .setResource("services/bulk-delete")
//       .setHeaders(headers)
//       .setBody(body)
//       .execute();
//   })
// );

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/services");
    const cookies = parseCookies(event);
    const body = await readBody(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .post()
      .setResource("services")
      .setHeaders(headers)
      .setBody(body)
      .execute();
  })
);

export default useBase("/api/services", router.handler);
