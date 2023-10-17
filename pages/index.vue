<template>
  <div class="bg min-h-screen">
    <div
      class="container mx-auto flex min-h-[500px] items-center justify-center"
    >
      <div class="w-1/2 pt-48">
        <BaseHeadline text="The most flexible and easiest accounting app " />
        <h1 class="mb-8 text-6xl font-semibold"></h1>
        <p class="mb-8 text-xl font-normal">
          Get started immediately and make use of features that no other app
          offers. invoi is uncomplicated and refreshing like lime lemonade.
        </p>
        <div class="flex gap-4">
          <BaseButton
            variant="yellow"
            to="/register"
            text="Sign up for a free account"
          />
          <BaseButton variant="outline" to="/login" text="Login" />
        </div>
      </div>
      <div class="w-1/2"></div>
    </div>
  </div>
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
