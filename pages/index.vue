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
  <section class="bg-blue-100 py-12">
    <div class="container mx-auto py-12">
      <div class="grid grid-cols-3">
        <div class="p-12">
          <UIcon
            class="h-20 w-20 text-blue-80 dark:text-gray-600"
            name="i-heroicons-document-chart-bar"
          />
          <BaseHeadline type="h2" text="Create invoices" />
          <BaseText class="text-gray-300">
            Create professional invoices in seconds, tailored to your brand, and
            leave the tedious paperwork behind. Elevate your business with
            seamless invoicing at your fingertips.
          </BaseText>
          <br /><br />
          <NuxtLink class="text-yellow-400" to="/#create-invoices"
            >Learn more</NuxtLink
          >
        </div>
        <div class="p-12">
          <UIcon
            class="h-20 w-20 text-blue-80 dark:text-gray-600"
            name="i-heroicons-user-circle"
          />
          <BaseHeadline type="h2" text="Manage contacts" />
          <BaseText class="text-gray-300">
            Efficiently organize your network by seamlessly managing contacts.
            Our user-friendly platform ensures smooth communication and easy
            access to essential information. Enhance your professional
            relationships and streamline your workflow with our straightforward
            contact management feature
          </BaseText>
        </div>
        <div class="p-12">
          <UIcon
            class="h-20 w-20 text-blue-80 dark:text-gray-600"
            name="i-heroicons-credit-card"
          />
          <BaseHeadline type="h2" text="Track expenses" />
          <BaseText class="text-gray-300">
            Simplify your financial management with our intuitive expense
            tracking feature. Easily categorize and analyze your expenditures,
            gaining valuable insights into your budget. Take control of your
            finances and make informed decisions effortlessly
          </BaseText>
        </div>
      </div>
    </div>
  </section>
  <section id="create-invoices" class="h-screen py-32">
    <div class="container mx-auto grid grid-cols-2 gap-12">
      <div>
        <BaseHeadline
          class="text-secondary-100 mb-24"
          type="h1"
          text="Features"
        />
        <BaseHeadline
          class="mb-4"
          type="h2"
          text="Create invoices in seconds"
        />
        <p class="text-gray-800 text-xl">
          Create professional invoices in seconds, tailored to your brand, and
          leave the tedious paperwork behind. Elevate your business with
          seamless invoicing at your fingertips.
        </p>
      </div>
      <video
        autoplay
        loop
        class="rounded-lg overflow-hidden shadow-lg"
        src="video/feature-create-invoice.mp4"
      ></video>
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
