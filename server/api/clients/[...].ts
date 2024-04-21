import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    return await getClients(event);
  })
);

router.post(
  "/create",
  defineEventHandler(async (event: H3Event) => {
    return await createClient(event);
  })
);

router.patch(
  "/:id",
  defineEventHandler(async (event: H3Event) => {
    return await patchClient(event);
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

async function getClients(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  console.log("getClients");
  const res: any = await $fetch(`${backendBaseUrl}/restapi/client`, {
    headers: {
      authorization: cookies.accessToken,
    },
  });
  return res;
}

async function patchClient(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const query = getQuery(event);
  console.log("query", query);
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/client/${query.id}`,
    {
      method: "PATCH",
      body,
      headers: {
        authorization: cookies.accessToken,
      },
    }
  );

  return res;
}

export default useBase("/api/clients", router.handler);
