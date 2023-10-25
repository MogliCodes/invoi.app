import { createRouter, defineEventHandler, useBase } from "h3";

const router = createRouter();

router.post(
  "/",
  defineEventHandler(() => createContact())
);

async function createContact() {
  console.log("createContact server");
}

export default useBase("/api/contacts", router.handler);
