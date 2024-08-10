t
<template>
  <section class="min-h-screen flex justify-center items-center">
    <BaseBox v-if="step === 0" class="w-1/3">
      <BaseHeadline type="h2" text="Einstellungen" />
      <p>
        Damit du invoi.app brauchen wir noch ein paar Informationen von dir.
        Bitte fülle die folgenden Felder aus.
      </p>
      <form action="">
        <div>
          <BaseLabel text="Vorname" />
          <BaseInput v-model="firstName" placeholder="Vorname" />
        </div>
        <div>
          <BaseLabel text="Nachname" />
          <BaseInput v-model="lastName" placeholder="Nachname" />
        </div>
        <div>
          <BaseLabel text="Straße" />
          <BaseInput v-model="street" placeholder="E-Mail" />
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
          <BaseButton @click="step++" type="button" text="Weiter" />
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
        <div class="justify-between flex pt-2">
          <BaseButton
            @click="step--"
            variant="outline"
            type="button"
            text="Zurück"
          />
          <BaseButton @click="step++" type="button" text="Weiter" />
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
            @click="step--"
            variant="outline"
            type="button"
            text="Zurück"
          />
          <BaseButton
            type="submit"
            @click="navigateTo('/dashboard')"
            text="Speichern & weiter"
          />
        </div>
      </form>
    </BaseBox>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "onboarding",
});

const step = ref(0);
</script>
