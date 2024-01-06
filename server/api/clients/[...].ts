import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    return await createClient(event);
  })
);

async function createClient(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/client`, {
    method: "POST",
    body,
    headers: {
      authorization: cookies.accessToken,
    },
  });
  console.log("res ", res);
  return res;
}

export default useBase("/api/clients", router.handler);
