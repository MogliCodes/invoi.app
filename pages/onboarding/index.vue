t
<template>
  <section class="flex min-h-screen items-center justify-center">
    <BaseBox v-if="step === 0" class="w-1/3">
      <BaseHeadline type="h2" text="Einstellungen" />
      <p>
        Damit du invoi.app brauchen wir noch ein paar Informationen von dir.
        Bitte fülle die folgenden Felder aus.
      </p>
      <form class="flex flex-col gap-2" action="">
        <div>
          <BaseLabel text="Vorname" />
          <BaseInput v-model="firstname" placeholder="Vorname" />
        </div>
        <div>
          <BaseLabel text="Nachname" />
          <BaseInput v-model="lastname" placeholder="Nachname" />
        </div>
        <div>
          <BaseLabel text="Straße" />
          <BaseInput v-model="street" placeholder="Straße" />
        </div>
        <div>
          <BaseLabel text="PLZ" />
          <BaseInput v-model="zip" placeholder="PLZ" />
        </div>
        <div>
          <BaseLabel text="Ort" />
          <BaseInput v-model="city" placeholder="Ort" />
        </div>
        <div class="flex justify-end pt-2">
          <BaseButton type="button" text="Weiter" @click="step++" />
        </div>
      </form>
    </BaseBox>
    <BaseBox v-if="step === 1" class="w-1/3">
      <BaseHeadline type="h2" text="Einstellungen" />
      <p>
        Damit du invoi.app brauchen wir noch ein paar Informationen von dir.
        Bitte fülle die folgenden Felder aus.
      </p>
      <form action="">
        <div>
          <BaseLabel text="Steuernummer" />
          <BaseInput v-model="taxId" placeholder="Steuernummer" />
        </div>
        <div>
          <BaseLabel text="USt-IdNr." />
          <BaseInput v-model="vatId" placeholder="USt-IdNr." />
        </div>
        <div>
          <BaseLabel text="Telefon" />
          <BaseInput v-model="phone" placeholder="Telefon" />
        </div>
        <div>
          <BaseLabel text="Webseite" />
          <BaseInput v-model="website" placeholder="Webseite" />
        </div>
        <div class="flex justify-between pt-2">
          <BaseButton
            variant="outline"
            type="button"
            text="Zurück"
            @click="step--"
          />
          <BaseButton type="button" text="Weiter" @click="step++" />
        </div>
      </form>
    </BaseBox>
    <BaseBox v-if="step === 2" class="w-1/3">
      <BaseHeadline type="h2" text="Einstellungen" />
      <p>
        Damit du invoi.app brauchen wir noch ein paar Informationen von dir.
        Bitte fülle die folgenden Felder aus.
      </p>
      <form action="">
        <div>
          <BaseLabel text="Steuernummer" />
          <BaseInput v-model="taxId" placeholder="Steuernummer" />
        </div>
        <div>
          <BaseLabel text="USt-IdNr." />
          <BaseInput v-model="vatId" placeholder="USt-IdNr." />
        </div>
        <div>
          <BaseLabel text="Telefon" />
          <BaseInput v-model="phone" placeholder="Telefon" />
        </div>
        <div>
          <BaseLabel text="Webseite" />
          <BaseInput v-model="website" placeholder="Webseite" />
        </div>
        <div class="flex justify-between pt-2">
          <BaseButton
            variant="outline"
            type="button"
            text="Zurück"
            @click="step--"
          />
          <BaseButton
            type="submit"
            text="Speichern & weiter"
            @click="saveAndContinue"
          />
        </div>
      </form>
    </BaseBox>
  </section>
</template>

<script setup lang="ts">
import { useSettings } from "~/composables/useSettings";

definePageMeta({
  layout: "onboarding",
});

const step = ref(0);
const {
  firstname,
  lastname,
  street,
  zip,
  city,
  phone,
  taxId,
  website,
  update,
} = useSettings();

async function saveAndContinue() {
  try {
    // Save data to the server
    await update();
    navigateTo("/dashboard");
  } catch (error) {
    alert("Something went wrong. Please try again.");
  }
}
</script>
