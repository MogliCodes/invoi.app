<template>
  <div class="container mx-auto">
    <h1 class="text-4xl">Login</h1>
    <div class="mb-6">
      <label class="block" for="username">Username</label>
      <input
        v-model="username"
        class="block bg-slate-100 p-4 shadow-lg"
        type="text"
      />
    </div>
    <div>
      <label class="block" for="password">Password</label>
      <input
        v-model="password"
        class="block bg-slate-100 p-4 shadow-lg"
        type="password"
      />
    </div>
    <button @click="login">Login</button>
  </div>
</template>

<script setup lang="ts">
const username = ref(null);
const password = ref(null);

async function login() {
  try {
    const { data } = await useFetch("/api/login", {
      method: "POST",
      body: {
        username,
        password,
      },
    });
    console.log("data", data);
  } catch (error) {
    console.log("error", error);
  }
}
</script>
