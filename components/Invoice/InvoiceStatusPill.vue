<template>
  <span
    class="rounded px-2 py-1"
    :class="getStatusPillBgClasses(props.invoice)"
    >{{ invoiceStatusText }}</span
  >
</template>
<script setup lang="ts">
import { getStatusPillBgClasses } from "~/utils/utils";

type Props = {
  invoice: Invoice;
};

const props = defineProps<Props>();

const invoiceStatusText = computed<string>(() => {
  switch (props.invoice.status) {
    case "paid":
      return "bezahlt";
    case "pending":
      return "ausstehend";
    case "unpaid":
      return "überfällig";
    default:
      return "";
  }
});
</script>
