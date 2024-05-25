import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/count",
  defineEventHandler(async (event: H3Event) => {
    return await getInvoiceCount(event);
  })
);

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

router.post(
  "/revenue/month",
  defineEventHandler(async (event: H3Event) => {
    return await getCurrentMonthRevenue(event);
  })
);

router.post(
  "/revenue/quarter",
  defineEventHandler(async (event: H3Event) => {
    return await getCurrentQuarterRevenue(event);
  })
);

router.post(
  "/revenue/year",
  defineEventHandler(async (event: H3Event) => {
    return await getCurrentYearRevenue(event);
  })
);

router.post(
  "/tax/month",
  defineEventHandler(async (event: H3Event) => {
    return await getCurrentMonthTax(event);
  })
);

router.post(
  "/tax/year",
  defineEventHandler(async (event: H3Event) => {
    return await getCurrentYearTax(event);
  })
);

router.post(
  "/tax/quarter",
  defineEventHandler(async (event: H3Event) => {
    return await getCurrentQuarterTax(event);
  })
);

async function getCurrentMonthTax(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/invoice/tax/month`, {
    method: "GET",
    headers: {
      authorization: cookies.accessToken,
      userid: cookies.userId,
    },
  });
  return res;
}

async function getCurrentQuarterTax(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/invoice/tax/quarter`,
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

async function getCurrentYearTax(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/invoice/tax/year`, {
    method: "GET",
    headers: {
      authorization: cookies.accessToken,
      userid: cookies.userId,
    },
  });
  return res;
}

async function getCurrentMonthRevenue(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/invoice/revenue/month`,
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

async function getCurrentQuarterRevenue(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/invoice/revenue/quarter`,
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

async function getCurrentYearRevenue(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/invoice/revenue/year`,
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

async function getInvoiceCount(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/invoice/count`, {
    method: "GET",
    headers: {
      authorization: cookies.accessToken,
      userid: cookies.userId,
    },
  });
  return res;
}

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
