<template>
  <span
    class="rounded px-2 py-1"
    :class="getStatusPillBgClasses(props.invoice)"
    >{{ props.invoice?.status }}</span
  >
</template>
<script setup lang="ts">
import { getStatusPillBgClasses } from "~/utils/utils";

type Props = {
  invoice: Invoice;
};

const props = defineProps<Props>();
</script>
