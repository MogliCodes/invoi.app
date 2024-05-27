<template>
  <section v-if="invoice">
    <div class="container mx-auto">
      <div>
        <header class="mb-12 flex justify-between">
          <div>
            <BaseHeadline class="mb-6" type="h1" :text="invoice.title" />
            <div>
              <span
                class="rounded px-2 py-1"
                :class="
                  isInvoiceDue(invoice)
                    ? 'bg-red-400 text-red-900'
                    : 'bg-amber-200 text-amber-900'
                "
                >{{
                  invoice?.status || isInvoiceDue(invoice) ? "due" : "unpaid"
                }}</span
              >
            </div>
          </div>
          <div>
            <BaseButton
              variant="outline"
              text="Mark as paid"
              @click="markAsPaid(invoice)"
            />
          </div>
        </header>
        <section class="grid grid-cols-2 gap-6">
          <div class="flex flex-col gap-6">
            <BaseBox>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <span class="block">Total amount</span>
                  <span
                    class="block font-syne text-3xl font-bold text-secondary-100"
                    >{{
                      formatCurrencyAmount(formatCentToAmount(invoice.total))
                    }}</span
                  >
                </div>
                <div>
                  <span class="block">Taxes</span>
                  <span
                    class="block font-syne text-3xl font-bold text-secondary-100"
                    >{{
                      formatCurrencyAmount(formatCentToAmount(invoice.taxes))
                    }}</span
                  >
                </div>
                <div>
                  <span class="block">Total amount</span>
                  <span
                    class="block font-syne text-3xl font-bold text-secondary-100"
                    >{{
                      formatCurrencyAmount(
                        formatCentToAmount(invoice.totalWithTaxes)
                      )
                    }}</span
                  >
                </div>
              </div>
            </BaseBox>
          </div>
          <div>
            <BaseBox> </BaseBox>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
const route = useRoute();
console.log(route.params.id);
const { data: invoice } = useFetch<Invoice>(
  `/api/invoices/${route.params.id}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

async function markAsPaid(invoice: Invoice) {
  console.log("markAsPaid", invoice._id);
  const apiUrl = `/api/invoices/${invoice._id}/mark-as-paid`;
  console.log("apiUrl", apiUrl);
  await $fetch(apiUrl, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
    body: {
      ...invoice,
      status: "paid",
    },
  });
}
</script>
