import { createRouter, defineEventHandler, H3Event, useBase } from "h3";

const router = createRouter();

router.post(
  "/get",
  defineEventHandler(async (event: H3Event) => {
    console.log("in get invoices");
    return await getInvoices(event);
  })
);

router.post(
  "/count",
  defineEventHandler(async (event: H3Event) => {
    return await getInvoiceCount(event);
  })
);

router.post(
  "/templates/get",
  defineEventHandler(async (event: H3Event) => {
    return await getCustomTemplates(event);
  })
);

router.post(
  "/templates/upload",
  defineEventHandler(async (event: H3Event) => {
    return await uploadInvoiceTemplate(event);
  })
);

router.post(
  "/templates/delete",
  defineEventHandler(async (event: H3Event) => {
    return await deleteInvoiceTemplate(event);
  })
);

router.patch(
  "/:id/mark-as-paid",
  defineEventHandler(async (event: H3Event) => {
    return await markInvoiceAsPaid(event);
  })
);

router.post(
  "/:id",
  defineEventHandler(async (event: H3Event) => {
    return await getInvoiceById(event);
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

async function getCustomTemplates(event: H3Event) {
  try {
    console.log("getCustomTemplates");
    const config = useRuntimeConfig();
    const backendBaseUrl = config.public.BACKEND_BASE_URL;
    const cookies = parseCookies(event);
    const res: any = await $fetch(
      `${backendBaseUrl}/restapi/invoice/templates`,
      {
        method: "GET",
        headers: {
          authorization: cookies.accessToken,
          userid: cookies.userId,
        },
      }
    );
    return res;
  } catch (e) {
    console.log("error in nitro", e);
  }
}

async function uploadInvoiceTemplate(event: H3Event) {
  console.log("uploadInvoiceTemplate");
  try {
    const config = useRuntimeConfig();
    const backendBaseUrl = config.public.BACKEND_BASE_URL;
    const cookies = parseCookies(event);
    const body = await readFormData(event);
    const headers = event.headers;
    console.log("headers YO", headers.get("templatename"));
    console.log("body", body);
    const res: any = await $fetch(
      `${backendBaseUrl}/restapi/invoice/templates/upload`,
      {
        method: "POST",
        body,
        headers: {
          authorization: cookies.accessToken,
          userid: cookies.userId,
          templateName: headers.get("templatename"),
          templateTags: headers.get("templatetags"),
        },
      }
    );
    console.log("res in nitro", res);
    return res;
  } catch (e) {
    console.log("error in nitro", e);
  }
}

async function deleteInvoiceTemplate(event: H3Event) {
  console.log("deleteInvoiceTemplate");
  try {
    const config = useRuntimeConfig();
    const backendBaseUrl = config.public.BACKEND_BASE_URL;
    const cookies = parseCookies(event);
    const body = await readBody(event);
    const headers = event.headers;
    const templateId = headers.get("Etag");
    const res: any = await $fetch(
      `${backendBaseUrl}/restapi/invoice/templates/${templateId}`,
      {
        method: "DELETE",
        body,
        headers: {
          authorization: cookies.accessToken,
          userid: cookies.userId,
        },
      }
    );
    return res;
  } catch (e) {
    console.log("error in nitro", e);
  }
}

async function getInvoices(event: H3Event) {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(`${backendBaseUrl}/restapi/invoice`, {
    method: "GET",
    body,
    headers: {
      authorization: cookies.accessToken,
      userid: cookies.userId,
    },
  });
  return res;
}

async function getInvoiceById(event: H3Event) {
  console.log("getInvoiceById");
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const params = getRouterParams(event);
  console.log("query", params);
  const cookies = parseCookies(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/invoice/${params.id}`,
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

async function markInvoiceAsPaid(event: H3Event) {
  const { id } = getRouterParams(event);
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;
  const cookies = parseCookies(event);
  const body = await readBody(event);
  const res: any = await $fetch(
    `${backendBaseUrl}/restapi/invoice/${id}/mark-as-paid`,
    {
      method: "PATCH",
      headers: {
        authorization: cookies.accessToken,
        userid: cookies.userId,
      },
      body,
    }
  );
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
