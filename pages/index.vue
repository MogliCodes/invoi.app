<template>
  <div>
    {{ user }}
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";

const user = useSupabaseUser();
if (user.value) navigateTo("/dashboard");
</script>
