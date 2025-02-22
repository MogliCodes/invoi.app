<template>
  <div>
    <section id="start" class="flex md:min-h-screen">
      <BaseContainer>
        <div
          class="flex h-full flex-col-reverse items-center justify-center md:flex-row"
        >
          <div class="md:w-1/2 md:pb-32">
            <BaseHeadline
              class="mb-4 text-blue-90 dark:text-white"
              text="Einfach Rechnungen schreiben ohne Stress"
            />
            <p class="mb-8 font-normal text-blue-90 md:text-xl dark:text-white">
              Mit invoi.app kannst du Rechnungen schreiben, Kontakte verwalten
              und Ausgaben im Blick behalten. Alles an einem Ort.
            </p>
            <div class="flex flex-col gap-2 md:flex-row md:items-center">
              <BaseButton
                variant="yellow"
                to="/register"
                text="Kostenlos registrieren"
              />
              <BaseButton variant="outline" to="/login" text="Einloggen" />
            </div>
          </div>
          <div class="flex h-full items-center p-12 md:w-1/2 md:pb-24">
            <img src="/img/undraw_printing-invoices_osgs.svg" alt="" />
          </div>
        </div>
      </BaseContainer>
    </section>
    <section id="features" class="min-h-screen py-32">
      <BaseContainer>
        <div>
          <BaseHeadline
            class="mb-12 text-blue-90 dark:text-white"
            type="h1"
            text="Features"
          />

          <div class="grid gap-8 lg:grid-cols-3">
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
    <section id="pricing" class="py-20">
      <BaseContainer>
        <div class="mb-12 text-center">
          <BaseHeadline
            type="h1"
            class="text-blue-90 dark:text-white"
            text="Preise, die zu dir passen"
          />
          <p class="text-gray-600 md:text-lg dark:text-gray-300">
            Flexible Preisoptionen für Selbstständige und kleine Unternehmen.
            Starte mit einer kostenlosen Testversion!
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-3">
          <!-- Free Tier -->
          <BaseBox class="text-center">
            <BaseHeadline
              type="h2"
              class="mb-4 text-blue-90 dark:text-white"
              text="Kostenlos"
            />
            <p class="text-gray-600 dark:text-gray-300">
              Teste invoi.app 14 Tage kostenlos.
            </p>
            <p class="my-6 text-3xl font-bold text-blue-90 dark:text-white">
              €0
            </p>
            <ul class="mb-6 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> Alle Basisfunktionen
              </li>
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> Max. 5 Rechnungen
              </li>
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> E-Mail Support
              </li>
            </ul>
            <BaseButton variant="yellow" to="/register" text="Jetzt testen" />
          </BaseBox>

          <!-- Pro Tier -->
          <BaseBox class="border-2 border-yellow-500 text-center">
            <BaseHeadline
              type="h2"
              class="mb-4 text-blue-90 dark:text-white"
              text="Pro"
            />
            <p class="text-gray-600 dark:text-gray-300">
              Perfekt für Selbstständige.
            </p>
            <p class="my-6 text-3xl font-bold text-blue-90 dark:text-white">
              €12<span class="text-lg">/Monat</span>
            </p>
            <ul class="mb-6 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> Unbegrenzte Rechnungen
              </li>
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> Individuelle Rechnungs-Templates
              </li>
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> Automatische Zahlungserinnerungen
              </li>
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> Priorisierter Support
              </li>
            </ul>
            <BaseButton variant="yellow" to="/register" text="Jetzt starten" />
          </BaseBox>

          <!-- Business Tier -->
          <BaseBox class="text-center">
            <BaseHeadline
              type="h2"
              class="mb-4 text-blue-90 dark:text-white"
              text="Business"
            />
            <p class="text-gray-600 dark:text-gray-300">
              Für Teams und Unternehmen.
            </p>
            <p class="my-6 text-3xl font-bold text-blue-90 dark:text-white">
              €29<span class="text-lg">/Monat</span>
            </p>
            <ul class="mb-6 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> Alle Pro-Funktionen
              </li>
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> Mehrere Benutzer
              </li>
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> API-Zugang
              </li>
              <li class="flex items-center justify-center">
                <span class="mr-2">✓</span> Premium-Support
              </li>
            </ul>
            <BaseButton variant="yellow" to="/register" text="Jetzt starten" />
          </BaseBox>
        </div>
      </BaseContainer>
    </section>
    <footer class="bg-blue-90 py-10 text-gray-300">
      <BaseContainer>
        <div class="grid gap-8 md:grid-cols-4">
          <!-- Logo & Beschreibung -->
          <div>
            <BaseHeadline
              type="h3"
              class="mb-3 font-syne text-white"
              text="invoi.app"
            />
            <p class="text-sm">
              Die einfache Lösung für Rechnungsstellung & Finanzen.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <BaseHeadline
              type="h4"
              class="mb-2 text-sm text-white"
              text="Navigation"
            />
            <ul class="space-y-1 text-sm">
              <li>
                <NuxtLink to="#features" class="hover:text-yellow-500"
                  >Funktionen</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="#pricing" class="hover:text-yellow-500"
                  >Preise</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/support" class="hover:text-yellow-500"
                  >Support</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Rechtliches -->
          <div>
            <BaseHeadline
              type="h4"
              class="mb-2 text-sm text-white"
              text="Rechtliches"
            />
            <ul class="space-y-1 text-sm">
              <li>
                <NuxtLink to="/privacy" class="hover:text-yellow-500"
                  >Datenschutz</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/terms" class="hover:text-yellow-500"
                  >AGB</NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/impressum" class="hover:text-yellow-500"
                  >Impressum</NuxtLink
                >
              </li>
            </ul>
          </div>

          <!-- Social Media & Kontakt -->
          <div>
            <BaseHeadline
              type="h4"
              class="mb-2 text-sm text-white"
              text="Kontakt"
            />
            <ul class="space-y-1 text-sm">
              <li>
                <a href="mailto:support@invoi.app" class="hover:text-yellow-500"
                  >support@invoi.app</a
                >
              </li>
              <li class="mt-2 flex space-x-4">
                <a href="#" class="hover:text-yellow-500"
                  ><Icon name="mdi:twitter" size="20"
                /></a>
                <a href="#" class="hover:text-yellow-500"
                  ><Icon name="mdi:linkedin" size="20"
                /></a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Trennlinie -->
        <div class="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          © {{ new Date().getFullYear() }} invoi.app – Alle Rechte vorbehalten.
        </div>
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
