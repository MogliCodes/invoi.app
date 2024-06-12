<template>
  <section class="flex flex-col gap-6">
    <BaseHeadline type="h1" text="Create service" />
    <BaseBox class="w-1/2">
      <form @submit.prevent="createService">
        <BaseText type="h3" class="mb-8 block text-2xl font-bold">
          Service base information
        </BaseText>
        <div class="mb-3">
          <BaseText>
            <label class="block" for="name">Service name</label>
          </BaseText>
          <BaseInput v-model="name" />
        </div>
        <div class="mb-3">
          <BaseText>
            <label class="block" for="description">Description</label>
          </BaseText>
          <BaseInput v-model="description" />
        </div>
        <div class="mb-3">
          <BaseText>
            <label class="block" for="price">Price</label>
          </BaseText>
          <BaseInput v-model="price" />
        </div>
        <BaseButton type="submit" text="Create service" />
      </form>
    </BaseBox>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
const authStore = useAuthStore();
const alertStore = useAlertStore();
const name = ref("");
const description = ref("");
const price = ref("");
async function createService(): Promise<void> {
  const res = await $fetch("/api/services", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
    },
    body: {
      name: name.value,
      description: description.value,
      price: price.value,
      user: authStore.userId,
    },
  });
  console.log(res);
  if (res.status === 201) {
    alertStore.setAlert("success", res.message);
    setTimeout(() => {
      alertStore.resetAlert();
    }, 5000);
    navigateTo("/services");
  }
}
</script>
