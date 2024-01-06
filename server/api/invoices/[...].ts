import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/",
  defineEventHandler(async (event: H3Event) => {
    return await createInvoice(event);
  })
);

router.delete(
  "/:id",
  defineEventHandler(async (event: H3Event) => {
    return await deleteInvoice(event);
  })
);

router.post(
  "/bulk/delete",
  defineEventHandler(async (event: H3Event) => {
    return await bulkDeleteInvoice(event);
  })
);

async function createInvoice(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/invoice`, {
    method: "POST",
    body,
    headers: {
      userId: cookies.userId,
      authorization: cookies.accessToken,
    },
  });
  return res;
}

async function deleteInvoice(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const query = getQuery(event);
  const cookies = parseCookies(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/invoice/${query.id}`,
    {
      method: "DELETE",
      headers: {
        userId: cookies.userId,
        authorization: cookies.accessToken,
      },
    }
  );

  return res;
}

async function bulkDeleteInvoice(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const body = await readBody(event);
  console.log(body);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/invoice/bulk/delete`,
    {
      method: "POST",
      body,
      headers: {
        userId: cookies.userId,
        authorization: cookies.accessToken,
      },
    }
  );

  return res;
}

export default useBase("/api/invoices", router.handler);
