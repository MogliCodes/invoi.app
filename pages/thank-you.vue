<script setup lang="ts">
import BaseInput from "~/components/BaseInput/BaseInput.vue";
import BaseButton from "~/components/base/BaseButton.vue";

definePageMeta({
  layout: "public",
});
</script>

<template>
  <section class="h-screen">
    <div class="flex h-full">
      <div class="flex h-full w-1/2 flex-col justify-center px-24 py-12">
        <div class="pb-12">
          <BaseHeadline
            class="mb-8 text-blue-80 dark:text-white"
            text="Danke für deine Anmeldung"
            type="h1"
          />
          <p class="w-6/12 text-xl text-slate-600 dark:text-white">
            Du wirst in kürze eine Bestätigungsmail erhalten. Du kannst dich
            <NuxtLink class="text-yellow-normal" to="/login"
              >hier einloggen</NuxtLink
            >.
          </p>
        </div>
      </div>
      <div class="flex h-full w-1/2 items-center px-12 pb-24">
        <img src="/img/undraw_printing-invoices_osgs.svg" alt="" />
      </div>
    </div>
  </section>
</template>
