<template>
  <section v-if="invoice">
    <div class="container mx-auto">
      <div class="flex flex-col gap-6">
        <header class="flex justify-between">
          <div>
            <BaseHeadline class="mb-2" type="h1" :text="invoice.nr" />
            <BaseHeadline class="" type="h2" :text="invoice.title" />
            <NuxtLink to="/invoices">
              <IconButton
                variant="secondary"
                size="md"
                icon="i-heroicons-chevron-left"
              />
            </NuxtLink>
          </div>
          <div>
            <BaseButton
              variant="outline"
              text="Mark as paid"
              @click="markAsPaid(invoice)"
            />
          </div>
        </header>
        <BaseBox>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <BaseLabel class="block" text="Rechnungsdatum" />
              <span class="block">{{ formatDate(invoice.date) }}</span>
            </div>
            <div>
              <BaseLabel class="block" text="Leistungszeitraum" />
              <span class="">{{
                formatDate(invoice.performancePeriodStart)
              }}</span>
              <span> – </span>
              <span class="">{{
                formatDate(invoice.performancePeriodEnd)
              }}</span>
            </div>
            <div>
              <BaseLabel class="block" text="Kunde" />
              <span v-if="client && client?.company" class="block">{{
                client.company
              }}</span>
            </div>
            <div>
              <BaseLabel class="block" text="Status" />
              <InvoiceStatusPill class="text-xs" :invoice="invoice" />
            </div>
          </div>
        </BaseBox>
        <section class="">
          <div class="flex flex-col gap-6">
            <BaseTable>
              <template #head>
                <BaseTableHeadCell>Position</BaseTableHeadCell>
                <BaseTableHeadCell>Description</BaseTableHeadCell>
                <BaseTableHeadCell>Preis</BaseTableHeadCell>
                <BaseTableHeadCell>Faktor</BaseTableHeadCell>
                <BaseTableHeadCell>Gesamtpreis</BaseTableHeadCell>
              </template>
              <template #body>
                <BaseTableRow v-for="(row, index) in JSON.parse(invoice.items)">
                  <BaseTableCell>{{ index + 1 }}</BaseTableCell>
                  <BaseTableCell
                    ><RichTextRenderer
                      v-model="row.description"
                    ></RichTextRenderer
                  ></BaseTableCell>
                  <BaseTableCell>{{
                    formatCurrencyAmount(formatCentToAmount(row.hours))
                  }}</BaseTableCell>
                  <BaseTableCell>{{ row.factor }}</BaseTableCell>
                  <BaseTableCell>{{
                    formatCurrencyAmount(formatCentToAmount(row.total))
                  }}</BaseTableCell>
                </BaseTableRow>
              </template>
            </BaseTable>
            <BaseBox>
              <div></div>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <BaseLabel class="block" text="Rechnungssumme Netto" />
                  <span
                    class="block font-syne text-3xl font-bold text-secondary-100"
                    >{{
                      formatCurrencyAmount(formatCentToAmount(invoice.total))
                    }}</span
                  >
                </div>
                <div>
                  <BaseLabel class="block" text="Mwst. 19%" />
                  <span
                    class="block font-syne text-3xl font-bold text-secondary-100"
                    >{{
                      formatCurrencyAmount(formatCentToAmount(invoice.taxes))
                    }}</span
                  >
                </div>
                <div>
                  <BaseLabel class="block" text="Rechnungssumme Brutto" />
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
        </section>
        <NuxtLink to="/invoices">
          <IconButton
            variant="secondary"
            size="md"
            icon="i-heroicons-chevron-left"
          />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { formatDate } from "~/utils/utils";
import InvoiceStatusPill from "~/components/Invoice/InvoiceStatusPill.vue";
import RichTextRenderer from "~/components/RichTextRenderer/RichTextRenderer.vue";
import { useAlertStore } from "~/stores/alert";

const authStore = useAuthStore();
const alertStore = useAlertStore();
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
  const res = await $fetch(apiUrl, {
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
  if (res.status === 200) {
    alertStore.setAlert("success", res.message);
    navigateTo("/invoices");
    setTimeout(() => {
      alertStore.resetAlert();
    }, 5000);
  }
}

const { data: client } = useFetch<Client>(
  `/api/clients/${invoice?.value?.client}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      Userid: authStore.userId,
    },
  }
);
</script>
