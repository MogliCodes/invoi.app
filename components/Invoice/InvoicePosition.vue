<template>
  <BaseTableRow
    v-if="props.row.isSubtotal"
    class="border-b-2 border-dashed border-secondary-100"
  >
    <td class="px-6 py-3" colspan="4">
      <span class="font-bold">Zwischensumme</span>
    </td>
    <td class="px-6 py-3 text-right">
      {{ formatCurrencyAmount(props.row.total) }}
    </td>
    <td class="px-6 py-3">
      <InvoicePositionActions
        @add-row="emit('addRow')"
        @add-subtotal="emit('addSubtotal')"
        @update:row="emit('update:row')"
        @delete-row="emit('deleteRow', props.row.position)"
      />
    </td>
  </BaseTableRow>
  <BaseTableRow
    v-else
    class="relative rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
  >
    <td class="w-1/12 px-6 py-3">{{ props.row.position }}</td>
    <td class="w-7/12 px-6 py-3">
      <RichTextEditor v-model="description"></RichTextEditor>
    </td>
    <td class="w-1/12 px-6 py-3 align-top">
      <UInput v-model.number="hours" class="w-auto" size="sm" type="number" />
    </td>
    <td class="w-1/12 px-6 py-3 align-top">
      <UInput v-model.number="factor" class="w-auto" size="sm" type="number" />
    </td>
    <td class="w-1/12 px-6 py-3 text-right align-top">
      <span>{{ formatCurrencyAmount(total) }}</span>
    </td>
    <td class="w-1/12 px-6 py-3 text-right align-top">
      <InvoicePositionActions
        @add-row="emit('addRow')"
        @add-subtotal="emit('addSubtotal')"
        @update:row="emit('update:row')"
        @delete-row="emit('deleteRow', props.row.position)"
      />
    </td>
  </BaseTableRow>
</template>

<script setup lang="ts">
import InvoicePositionActions from "~/components/Invoice/InvoicePositionActions.vue";

type Props = {
  row: InvoicePosition;
};
const props = defineProps<Props>();
const emit = defineEmits(["update:row", "addRow", "deleteRow", "addSubtotal"]);

const description = ref(props.row.description);
const hours = ref(props.row.hours);
const factor = ref(props.row.factor);
const total = ref(props.row.total);

watch([hours, factor], () => {
  total.value = hours.value * factor.value;
});

watch([description, hours, factor, total], () => {
  emit("update:row", {
    position: props.row.position,
    description: description.value,
    hours: hours.value,
    factor: factor.value,
    total: total.value,
  });
});
</script>
