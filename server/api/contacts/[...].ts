import { createRouter, defineEventHandler, H3Event, useBase } from "h3";
import ApiClientBuilder from "~/server/utils/apiClientBuilder";

const router = createRouter();

router.post(
  "/get",
  defineEventHandler(async (event: H3Event) => {
    const query = getQuery(event);
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies?.userId,
      authorization: cookies.accessToken,
    };
    console.log("params", query);
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .get()
      .setResource("contact")
      .setHeaders(headers)
      .addParam("client", `${query.clientId}`)
      .execute();
  })
);

router.post(
  "/count",
  defineEventHandler(async (event: H3Event) => {
    const query = getQuery(event);
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies?.userId,
      authorization: cookies.accessToken,
    };
    const apiClient = new ApiClientBuilder();
    return await apiClient
      .get()
      .setResource("contact")
      .setEndpoint("count")
      .setHeaders(headers)
      .execute();
  })
);

router.post(
  "/create",
  defineEventHandler(async (event: H3Event) => {
    return await createContact(event);
  })
);

router.post(
  "/demo",
  defineEventHandler(async (event: H3Event) => {
    return await createDemoContacts(event);
  })
);

router.post(
  "/:id",
  defineEventHandler(async (event: H3Event) => {
    return await getContactById(event);
  })
);

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    return await getContacts(event);
  })
);

router.post(
  "/count",
  defineEventHandler(async (event: H3Event) => {
    return getContactCount(event);
  })
);

router.patch(
  "/:id",
  defineEventHandler(async (event: H3Event) => {
    return await patchContact(event);
  })
);

router.post(
  "/bulk/delete",
  defineEventHandler(async (event: H3Event) => {
    return await bulkDeleteContact(event);
  })
);

router.delete(
  "/demo",
  defineEventHandler(async (event: H3Event) => {
    const apiClient = new ApiClientBuilder();
    const cookies = parseCookies(event);
    const headers = {
      userId: cookies?.userId,
      authorization: cookies.accessToken,
    };
    return await apiClient
      .delete()
      .setResource("contact")
      .setEndpoint("demo")
      .setHeaders(headers)
      .execute();
  })
);

router.delete(
  "/:id",
  defineEventHandler(async (event: H3Event) => {
    return await deleteContact(event);
  })
);

// async function callApi(event: H3Event, url: string) {
//   const config = useRuntimeConfig();
//   const backendBaseUrl = config.public.BACKEND_BASE_URL;
//   const cookies = parseCookies(event);
//   const body = await readBody(event);
//   const { resource, method, resourceId } = body;
//   const res: any = await $fetch(`${backendBaseUrl}${resource}`, {
//     method,
//     headers: {
//       authorization: cookies.accessToken,
//       userid: cookies.userId,
//     },
//     body: resourceId,
//   });
//   return res;
// }

async function getContacts(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const query = getQuery(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/contact`, {
    method: "GET",
    headers: {
      authorization: cookies.accessToken,
      userid: cookies.userId,
    },
    query: {
      page: query.page,
      pageSize: query.pageSize,
      search: query.search,
    },
  });
  return res;
}

async function getContactById(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const params = getRouterParams(event);
  const cookies = parseCookies(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/contact/${params.id}`,
    {
      method: "GET",
      headers: {
        authorization: cookies.accessToken,
        userid: cookies.userId,
      },
    }
  );
  return res;
}

async function createDemoContacts(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/contact/demo`, {
    method: "POST",
    headers: {
      userid: cookies.userId,
      authorization: cookies.accessToken,
    },
  });
  return res;
}

async function createContact(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/contact`, {
    method: "POST",
    body,
    headers: {
      authorization: cookies.accessToken,
      userid: cookies.userId,
    },
  });

  return res;
}

async function patchContact(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const query = getQuery(event);
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/contact/${query.id}`,
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

async function deleteContact(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const contactId = getRouterParams(event).id;
  const cookies = parseCookies(event);
  const body = await readBody(event);

  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/contact/${contactId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: cookies.accessToken,
        userId: cookies.userId,
      },
      body,
    }
  );
  return res;
}

async function bulkDeleteContact(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const body = await readBody(event);
  const cookies = parseCookies(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/contact/bulk/delete`,
    {
      method: "POST",
      headers: {
        userId: cookies.userId,
        authorization: cookies.accessToken,
      },
      body,
    }
  );
  return res;
}

async function getContactCount(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/contact/count`, {
    method: "GET",
    headers: {
      authorization: cookies.accessToken,
      userId: cookies.userId,
    },
  });

  return res;
}

export default useBase("/api/contacts", router.handler);
