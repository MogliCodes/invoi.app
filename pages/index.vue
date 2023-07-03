<template>
  <div>
    {{ user }}
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from "nuxt/app";
import { useSupabaseUser } from "@nuxtjs/supabase/dist/runtime/composables/useSupabaseUser";

const user = useSupabaseUser();
if (user.value) navigateTo("/dashboard");
</script>
