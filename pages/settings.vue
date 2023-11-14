<template>
  <BaseHeadline class="dark:text-white mb-6" text="Settings" type="h1" />
  <BaseHeadline
    class="dark:text-white mb-2 font-bold text-xl"
    text="General"
    type="h2"
  />
  <div class="flex flex-col gap-6">
    <BaseBox>
      <BaseHeadline
        class="dark:text-white mb-2 font-bold text-xl"
        text="User settings"
        type="h3"
      />
      <div class="flex flex-col gap-3 mb-6 w-2/3">
        <BaseInput placeholder="Username" v-model="username" />
        <BaseInput placeholder="E-Mail" v-model="email" />
        <BaseInput placeholder="Firstname" v-model="firstname" />
        <BaseInput placeholder="Lastname" v-model="lastname" />
        <BaseInput placeholder="Street" v-model="street" />
        <BaseInput placeholder="ZIP" v-model="zip" />
        <BaseInput placeholder="City" v-model="city" />
        <BaseInput placeholder="Phone" v-model="phone" />
      </div>
      <BaseButton text="Save settings" />
    </BaseBox>
    <div>
      <BaseHeadline
        class="dark:text-white font-bold text-xl"
        text="Templates"
        type="h2"
      />
      <BaseBox>
        <div>
          <BaseHeadline
            class="dark:text-white mb-2 font-bold"
            text="Invoices"
            type="h3"
          />
          <div class="flex flex-col w-2/3 gap-3">
            <div>
              <label class="dark:text-white" for=""
                >Invoice number schema</label
              >
              <BaseInput placeholder="2023-001 (YYYY-XXX)" v-model="phone" />
            </div>
            <div>
              <label class="dark:text-white" for="">Invoice front page</label>
              <BaseInput
                placeholder="Thanks for working with us!"
                v-model="phone"
              />
            </div>
            <div>
              <label for="">Invoice due notice</label>
              <BaseInput
                placeholder="Please transfer the amount by"
                v-model="phone"
              />
            </div>
          </div>
        </div>
      </BaseBox>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
const username = ref(authStore.userName);
const email = ref("");
const firstname = ref("");
const lastname = ref("");
const street = ref("");
const zip = ref("");
const city = ref("");
const phone = ref("");
</script>
