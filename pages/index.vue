<template>
  <div>
    <section class="md:min-h-screen">
      <BaseContainer>
        <div class="flex flex-col-reverse h-full items-center justify-center">
          <div class="md:w-1/2 md:pb-32">
            <BaseHeadline
              class="text-blue-90 dark:text-white mb-4"
              text="Einfach Rechnungen schreiben ohne Stress"
            />
            <p class="mb-8 md:text-xl font-normal text-blue-90 dark:text-white">
              Mit invoi.app kannst du Rechnungen schreiben, Kontakte verwalten
              und Ausgaben im Blick behalten. Alles an einem Ort.
            </p>
            <div class="flex flex-col md:items-center gap-2">
              <BaseButton
                variant="yellow"
                to="/register"
                text="Kostenlos registrieren"
              />
              <BaseButton variant="outline" to="/login" text="Einloggen" />
            </div>
          </div>
          <div class="flex h-full md:w-1/2 items-center px-12 py-12 md:pb-24">
            <img src="/img/undraw_printing-invoices_osgs.svg" alt="" />
          </div>
        </div>
      </BaseContainer>
    </section>
    <section class="hidden bg-blue-100 py-12">
      <div class="container mx-auto py-12">
        <div class="grid grid-cols-3">
          <div class="p-12">
            <img src="/img/undraw_fast_y061.svg" alt="" />
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
              class="size-20 text-blue-80 dark:text-gray-600"
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
              class="size-20 text-blue-80 dark:text-gray-600"
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
    <section id="create-invoices" class="min-h-screen py-32">
      <BaseContainer>
        <div>
          <BaseHeadline
            class="mb-12 text-blue-90 dark:text-white"
            type="h1"
            text="Features"
          />

          <div class="grid gap-8 md:grid-cols-3">
            <BaseBox class="p-10">
              <figure class="px-20 py-10">
                <img class="mx-auto h-40" src="/img/undraw_fast_y061.svg" />
              </figure>
              <BaseHeadline
                class="mb-4"
                type="h2"
                text="Erstelle Rechnungen in Sekunden"
              />
              <p class="text-gray-600 dark:text-gray-200">
                Erstelle professionelle Rechnungen in Sekunden, die auf Deine
                Marke zugeschnitten sind, und lasse den lästigen Papierkram
                hinter Dir. Erhebe Dein Geschäft mit nahtloser Rechnungsstellung
                auf Knopfdruck.
              </p></BaseBox
            >
            <BaseBox class="p-10">
              <figure class="px-20 py-10">
                <img
                  class="mx-auto h-40"
                  src="/img/undraw_website-builder_smzl.svg"
                />
              </figure>
              <BaseHeadline
                class="mb-4"
                type="h2"
                text="Nutze Deine eigenen Templates"
              />
              <p class="text-gray-600 dark:text-gray-200">
                Erstelle professionelle Rechnungen in Sekunden, die auf Deine
                Marke zugeschnitten sind, und lasse den lästigen Papierkram
                hinter Dir. Erhebe Dein Geschäft mit nahtloser Rechnungsstellung
                auf Knopfdruck.
              </p></BaseBox
            >
            <BaseBox class="p-10">
              <figure class="px-20 py-10">
                <img
                  class="mx-auto h-40"
                  src="/img/undraw_my-documents_ltqk.svg"
                />
              </figure>
              <BaseHeadline
                class="mb-4"
                type="h2"
                text="Trage Daten für deine Steuererklärung zusammen"
              />
              <p class="text-gray-600 dark:text-gray-200">
                Erstelle professionelle Rechnungen in Sekunden, die auf Deine
                Marke zugeschnitten sind, und lasse den lästigen Papierkram
                hinter Dir. Erhebe Dein Geschäft mit nahtloser Rechnungsstellung
                auf Knopfdruck.
              </p></BaseBox
            >
          </div>
        </div>
      </BaseContainer>
    </section>
    <footer class="w-full bg-blue-90 py-12 text-white">
      <BaseContainer>
        <div class="mb-4 md:mb-0 md:w-1/5">
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
      </BaseContainer>
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
