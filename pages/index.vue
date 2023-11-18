<template>
  <section class="h-screen">
    <div class="container mx-auto flex h-full items-center justify-center">
      <div class="w-1/2 pb-32">
        <BaseHeadline
          class="text-blue-90 dark:text-white"
          text="The most flexible and easiest accounting app "
        />
        <h1 class="mb-8 text-6xl font-semibold"></h1>
        <p class="mb-8 text-xl font-normal text-blue-90 dark:text-white">
          Get started immediately and make use of features that no other app
          offers. invoi is uncomplicated and refreshing like lime lemonade.
        </p>
        <div class="flex items-center gap-4">
          <BaseButton
            variant="yellow"
            to="/register"
            text="Sign up for a free account"
          />
          <BaseButton variant="outline" to="/login" text="Login" />
        </div>
      </div>
      <div class="w-1/2 h-full flex items-center px-12 pb-24">
        <img src="/img/invoi-illu.svg" alt="" />
      </div>
    </div>
  </section>
  <section class="bg-blue-100">
    <div class="container mx-auto py-12">
      <div class="grid grid-cols-3">
        <div class="text-center">
          <UIcon
            class="h-20 w-20 text-blue-80 dark:text-gray-600"
            name="i-heroicons-document-chart-bar"
          />
          <BaseHeadline type="h2" text="Create invoices" />
        </div>
        <div class="text-center">
          <UIcon
            class="h-20 w-20 text-blue-80 dark:text-gray-600"
            name="i-heroicons-user-circle"
          />
          <BaseHeadline type="h2" text="Manage contacts" />
        </div>
        <div class="text-center">
          <UIcon
            class="h-20 w-20 text-blue-80 dark:text-gray-600"
            name="i-heroicons-credit-card"
          />
          <BaseHeadline type="h2" text="Track expenses" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "public",
});
</script>

<style>
.bg {
  background-image: url("/img/home.svg");
  background-position: 150% 100%;
  background-repeat: no-repeat;
  background-size: 70%;
}
</style>
