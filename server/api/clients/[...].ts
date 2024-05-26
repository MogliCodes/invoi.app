import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/count",
  defineEventHandler(async (event: H3Event) => {
    return await getClientCount(event);
  })
);

router.post(
  "/demo",
  defineEventHandler(async (event: H3Event) => {
    return createDemoClients(event);
  })
);

router.post(
  "/:id",
  defineEventHandler(async (event: H3Event) => {
    return await getClientById(event);
  })
);

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

async function getClientCount(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/client/count`, {
    method: "GET",
    headers: {
      authorization: cookies.accessToken,
      userid: cookies.userId,
    },
  });
  return res;
}

async function createDemoClients(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/client/demo`, {
    method: "POST",
    body,
    headers: {
      authorization: cookies.accessToken,
      userid: cookies.userId,
    },
  });
  return res;
}

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
  return res;
}

async function getClients(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/client`, {
    method: "GET",
    headers: {
      authorization: cookies.accessToken,
      userid: cookies.userId,
    },
  });
  return res;
}

async function getClientById(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const params = getRouterParams(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/client/${params.id}`,
    {
      headers: {
        authorization: cookies.accessToken,
        userid: cookies.userId,
      },
    }
  );
  return res;
}

async function patchClient(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const query = getQuery(event);
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/client/${query.id}`,
    {
      method: "GET",
      body,
      headers: {
        authorization: cookies.accessToken,
        Userid: cookies.Userid,
      },
    }
  );

  return res;
}

export default useBase("/api/clients", router.handler);
