<template>
  <div>
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
        <div class="flex h-full w-1/2 items-center px-12 pb-24">
          <img src="/img/invoi-illu.svg" alt="" />
        </div>
      </div>
    </section>
    <section class="bg-blue-100 py-12 hidden">
      <div class="container mx-auto py-12">
        <div class="grid grid-cols-3">
          <div class="p-12">
            <UIcon
              class="h-20 w-20 text-blue-80 dark:text-gray-600"
              name="i-heroicons-document-chart-bar"
            />
            <BaseHeadline type="h2" text="Create invoices" />
            <BaseText class="text-gray-300">
              Create professional invoices in seconds, tailored to your brand,
              and leave the tedious paperwork behind. Elevate your business with
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
              access to essential information.
            </BaseText>
            <br /><br />
            <NuxtLink class="text-yellow-400" to="/#manage-contacts"
              >Learn more</NuxtLink
            >
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
              gaining valuable insights into your budget.
            </BaseText>
            <br /><br />
            <NuxtLink class="text-yellow-400" to="/#track-expenses"
              >Learn more</NuxtLink
            >
          </div>
        </div>
      </div>
    </section>
    <section id="create-invoices" class="h-screen py-32">
      <div class="container mx-auto gap-12">
        <div>
          <BaseHeadline class="mb-12 text-blue-90" type="h1" text="Features" />

          <div class="grid md:grid-cols-3 gap-8">
            <BaseBox class="p-10">
              <UIcon
                class="h-20 w-20 text-blue-600"
                name="i-heroicons-document-chart-bar"
              />
              <BaseHeadline
                class="mb-4"
                type="h2"
                text="Erstelle Rechnungen in Sekunden"
              />
              <p class="text-gray-600">
                Erstelle professionelle Rechnungen in Sekunden, die auf Deine
                Marke zugeschnitten sind, und lasse den lästigen Papierkram
                hinter Dir. Erhebe Dein Geschäft mit nahtloser Rechnungsstellung
                auf Knopfdruck.
              </p></BaseBox
            >
            <BaseBox class="p-10">
              <UIcon
                class="h-20 w-20 text-blue-600"
                name="i-heroicons-document-chart-bar"
              />
              <BaseHeadline
                class="mb-4"
                type="h2"
                text="Nutze Deine eigenen Templates"
              />
              <p class="text-gray-600">
                Erstelle professionelle Rechnungen in Sekunden, die auf Deine
                Marke zugeschnitten sind, und lasse den lästigen Papierkram
                hinter Dir. Erhebe Dein Geschäft mit nahtloser Rechnungsstellung
                auf Knopfdruck.
              </p></BaseBox
            >
            <BaseBox class="p-10">
              <UIcon
                class="h-20 w-20 text-blue-600"
                name="i-heroicons-document-chart-bar"
              />
              <BaseHeadline
                class="mb-4"
                type="h2"
                text="Trage Daten für deine Steuererklärung zusammen"
              />
              <p class="text-gray-600">
                Erstelle professionelle Rechnungen in Sekunden, die auf Deine
                Marke zugeschnitten sind, und lasse den lästigen Papierkram
                hinter Dir. Erhebe Dein Geschäft mit nahtloser Rechnungsstellung
                auf Knopfdruck.
              </p></BaseBox
            >
          </div>
        </div>
      </div>
    </section>
    <footer class="w-full bg-blue-90 py-12 text-white">
      <div class="container mx-auto flex justify-between">
        <div class="w-1/5">
          <BaseText
            text-color="text-white"
            text-color-dark-mode="dark:text-white"
          >
            invoi.app ist eine einfache und flexible Rechnungssoftware für
            Selbstständige und kleine Unternehmen.
          </BaseText>
        </div>
        <div class="w-1/5">
          <BaseHeadline type="h2" text="invoi" />
          <ul class="flex flex-col gap-2">
            <li>Über uns</li>
            <li>Preise</li>
            <li>Impressum</li>
            <li>Datenschutz</li>
          </ul>
        </div>
        <div class="w-1/5"></div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "invoi - The most flexible and easiest accounting app",
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
