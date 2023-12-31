import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    return await createContact(event);
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
  "/:id",
  defineEventHandler(async (event: H3Event) => {
    return await deleteContact(event);
  })
);

async function createContact(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/api/contact`, {
    method: "POST",
    body,
    headers: {
      authorization: cookies.accessToken,
    },
  });

  return res;
}

async function patchContact(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const query = getQuery(event);
  console.log("query", query);
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/api/contact/${query.id}`, {
    method: "PATCH",
    body,
    headers: {
      authorization: cookies.accessToken,
    },
  });

  return res;
}

async function deleteContact(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const query = getQuery(event);
  console.log("NUXT SERVER  DELETE", query);
  const cookies = parseCookies(event);
  const body = await readBody(event);

  const res: any = await $fetch(`${backendBaseUrl}/api/contact/${query.id}`, {
    method: "DELETE",
    headers: {
      authorization: cookies.accessToken,
    },
    body,
  });
  return res;
}

async function bulkDeleteContact(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const query = getQuery(event);
  const body = await readBody(event);
  console.log("NUXT SERVER BULK DELETE", query);
  console.log("NUXT SERVER BULK DELETE", body);
  console.log("NUXT SERVER BULK QWHSKHSKJHJKSHFKJSHFJS", body);
  const cookies = parseCookies(event);
  const res: any = await $fetch(`${backendBaseUrl}/api/contact/bulk/delete`, {
    method: "POST",
    headers: {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    },
    body,
  });
  return res;
}

export default useBase("/api/contacts", router.handler);
