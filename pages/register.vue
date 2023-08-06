<template>
  <div class="container mx-auto flex justify-center">
    <div class="flex flex-col items-center">
      <BaseHeadline class="mb-8" text="Sign up for  a free account" type="h1" />
      <div
        class="rounded border border-white border-opacity-30 bg-white bg-opacity-5 p-8"
      >
        <div class="mb-3">
          <label class="block" for="username">Username</label>
          <BaseInput v-model="username" />
        </div>
        <div class="mb-3">
          <label class="block" for="username">E-Mail</label>
          <BaseInput v-model="email" />
        </div>
        <div class="mb-3">
          <label class="block" for="password">Password</label>
          <BaseInput v-model="password" />
        </div>
        <BaseButton variant="yellow" text="Register" @click="register" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const username = ref(null);
const email = ref(null);
const password = ref(null);

definePageMeta({
  layout: "public",
});

async function register() {
  try {
    const { data } = await useFetch("/api/register", {
      method: "POST",
      body: {
        username,
        email,
        password,
      },
    });
    console.log("data", data);
  } catch (error) {
    console.error(error);
  }
}
</script>
