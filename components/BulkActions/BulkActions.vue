<template>
  <div class="flex justify-between py-4">
    <div class="flex items-center gap-2">
      <USelectMenu
        v-model="selectedBulkAction"
        placeholder="Choose an action"
        class="cursor-pointer"
        size="xl"
        color="white"
        :options="bulkActionOptions"
      >
        <template #label>
          {{ selectedBulkAction }}
        </template>
      </USelectMenu>
      <BaseButton size="sm" text="Apply" @click="executeBulkAction" />
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  bulkActionOptions: Array<string>;
  resource: "clients" | "invoices" | "products" | "users";
};
defineProps<Props>();

const selectedBulkAction = ref("");

function executeBulkAction() {
  console.log("Bulk Action Executed");
}
</script>
