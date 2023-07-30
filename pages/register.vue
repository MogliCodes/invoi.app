<template>
  <div class="container mx-auto">
    <BaseHeadline class="mb-8" text="Sign up a for a free account" type="h1" />
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
    <BaseButton text="Register" @click="register" />
  </div>
</template>

<script setup lang="ts">
const username = ref(null);
const email = ref(null);
const password = ref(null);

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
