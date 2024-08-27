<template>
  <BaseTableRow v-if="props.row.isSubtotal">
    <td></td>
    <td class="px-6 py-3" colspan="4">Zwischensumme</td>
    <td class="px-6 py-3 text-right">
      {{ formatToCurrency(props.row.total) }}
    </td>
  </BaseTableRow>
  <BaseTableRow
    v-else
    class="relative rounded bg-white p-4 even:bg-gray-200 dark:odd:bg-blue-80 dark:even:bg-blue-90"
  >
    <td
      class="add-row-btn absolute -left-5 bottom-0 flex h-10 w-10 translate-y-1/2 scale-50 cursor-pointer items-center justify-center rounded-full bg-secondary-100 opacity-0 transition-all"
    >
      <UIcon
        @click="emit('addRow')"
        @click.right="rightClick"
        name="i-heroicons-plus"
        class="text-xl text-white"
      />
    </td>
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
    <td class="w-2/12 px-6 py-3 text-right align-top">
      <span>{{ formatCurrencyAmount(total) }}</span>
    </td>
  </BaseTableRow>
</template>

<script setup lang="ts">
type Props = {
  row: InvoicePosition;
};
const props = defineProps<Props>();
const emit = defineEmits(["update:row", "addRow", "addSubtotal"]);

const description = ref(props.row.description);
const hours = ref(props.row.hours);
const factor = ref(props.row.factor);
const total = ref(props.row.total);

watch([hours, factor], () => {
  total.value = hours.value * factor.value;
});

watch([description, hours, factor, total], () => {
  emit("update:row", {
    description: description.value,
    hours: hours.value,
    factor: factor.value,
    total: total.value,
  });
});

function rightClick(): void {
  emit("addSubtotal");
}
</script>
