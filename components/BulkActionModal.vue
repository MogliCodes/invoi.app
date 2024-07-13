<template>
  <UModal :key="isOpen" v-model="isOpen">
    <div class="flex flex-col items-center p-8 text-center">
      <div
        class="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-500"
      >
        <UIcon class="text-2xl text-red-900" name="i-heroicons-trash" />
      </div>
      <BaseHeadline class="mb-2" type="h3" text="Confirm delete" />
      <section v-if="itemId">
        <p class="mb-8">Are you sure you want to delete this entry?</p>
        <div class="mb-8 break-all rounded bg-black p-2 text-gray-200">
          {{ itemId }}
        </div>
        <div class="flex justify-center gap-4">
          <BaseButton
            variant="outline"
            text="Discard"
            @click="isOpen = false"
          />
          <BaseButton variant="red" text="Delete" @click="executeBulkDelete" />
        </div>
      </section>
      <section v-else>
        <p class="mb-8">
          Are you sure you want to delete the entries with the following ids?
        </p>
        <div class="mb-8 break-all rounded bg-black p-2 text-gray-200">
          {{ selectedItems?.toString().replaceAll(",", ", ") }}
        </div>
        <div class="flex justify-center gap-4">
          <BaseButton
            variant="outline"
            text="Discard"
            @click="discardBulkAction"
          />
          <BaseButton variant="red" text="Delete" @click="executeBulkDelete" />
        </div>
      </section>
    </div>
  </UModal>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

type Props = {
  isOpen: boolean;
  selectedItems?: string[];
  itemId?: string;
  resource: string;
};

const emit = defineEmits(["discard-action", "execute-action"]);
const props = defineProps<Props>();
const isOpen = ref(props.isOpen);

function discardBulkAction(): void {
  isOpen.value = false;
  emit("discard-action");
}

const authStore = useAuthStore();
async function executeBulkDelete(): Promise<void> {
  let ids = [];
  if (props.selectedItems && props.selectedItems.length > 0) {
    ids = props.selectedItems;
  } else {
    ids = [props.itemId];
  }
  emit("execute-action", { action: "Delete", ids });
}
</script>
