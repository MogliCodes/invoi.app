import { createRouter, defineEventHandler, H3Event, useBase } from "h3";
import ApiClientBuilder from "~/server/utils/apiClientBuilder";

const router = createRouter();

router.delete(
  "/projects/:id",
  defineEventHandler(async (event: H3Event) => {
    console.log("DELETE /api/clients/projects/:id");
    const params = getRouterParams(event);
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .delete()
      .setResource(`client/projects/${params.id}`)
      .setHeaders(headers)
      .execute();
  })
);

router.post(
  "/projects/client/:id/get",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/clients/projects/client/:id/get");
    const params = getRouterParams(event);
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .get()
      .setResource(`client/projects/client/${params.id}`)
      .setHeaders(headers)
      .execute();
  })
);

router.post(
  "/projects/get",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/clients/projects/get");
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .get()
      .setResource("client/projects")
      .setHeaders(headers)
      .execute();
  })
);

router.post(
  "/projects",
  defineEventHandler(async (event: H3Event) => {
    console.log("POST /api/clients/projects");
    const cookies = parseCookies(event);
    const body = await readBody(event);
    console.log("body", body);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .post()
      .setResource("client/projects")
      .setHeaders(headers)
      .setBody(body)
      .execute();
  })
);

router.post(
  "/count",
  defineEventHandler(async (event: H3Event) => {
    return await getClientCount(event);
  })
);

router.post(
  "/delete/:id",
  defineEventHandler(async (event: H3Event) => {
    const apiClient = new ApiClientBuilder();
    const params = getRouterParams(event);
    const cookies = parseCookies(event);
    console.log("params", params);
    const query = getQuery(event);
    console.log("query", query);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    return await apiClient
      .delete()
      .setResource(`client/${params.id}`)
      .setHeaders(headers)
      .setBody([params.id])
      .execute();
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
  "/get",
  defineEventHandler(async (event: H3Event) => {
    const apiClient = new ApiClientBuilder();
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    };
    return await apiClient
      .get()
      .setResource("client")
      .setHeaders(headers)
      .execute();
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
