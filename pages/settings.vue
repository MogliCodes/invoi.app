<template>
  <div class="w-2/3">
    <BaseHeadline class="mb-6 dark:text-white" text="Settings" type="h1" />
    <BaseHeadline
      class="mb-2 text-xl font-bold dark:text-white"
      text="General"
      type="h2"
    />
    <div class="flex flex-col gap-6">
      <BaseBox>
        <BaseHeadline
          class="mb-2 text-xl font-bold dark:text-white"
          text="User information"
          type="h3"
        />
        <div class="mb-6 flex w-2/3 flex-col gap-3">
          <div>
            <label class="dark:text-white" for="">Profile image</label>
            <BaseInput
              v-model="profileImage"
              type="file"
              placeholder="Username"
            />
          </div>
          <BaseInput v-model="username" placeholder="Username" />
          <BaseInput v-model="email" placeholder="E-Mail" />
          <BaseInput v-model="firstname" placeholder="Firstname" />
          <BaseInput v-model="lastname" placeholder="Lastname" />
          <BaseInput v-model="street" placeholder="Street" />
          <BaseInput v-model="zip" placeholder="ZIP" />
          <BaseInput v-model="city" placeholder="City" />
          <BaseInput v-model="phone" placeholder="Phone" />
        </div>
        <BaseButton text="Save settings" />
      </BaseBox>
      <div>
        <BaseHeadline
          class="text-xl font-bold dark:text-white"
          text="Templates"
          type="h2"
        />
        <BaseBox>
          <div>
            <BaseHeadline
              class="mb-2 font-bold dark:text-white"
              text="Invoices"
              type="h3"
            />
            <div class="flex w-2/3 flex-col gap-3">
              <div>
                <label class="dark:text-white" for=""
                  >Invoice number schema</label
                >
                <BaseInput v-model="phone" placeholder="2023-001 (YYYY-XXX)" />
              </div>
              <div>
                <label class="dark:text-white" for="">Invoice front page</label>
                <BaseInput
                  v-model="phone"
                  placeholder="Thanks for working with us!"
                />
              </div>
              <div>
                <label class="dark:text-white" for="">Invoice due notice</label>
                <BaseInput
                  v-model="phone"
                  placeholder="Please transfer the amount by"
                />
              </div>
            </div>
          </div>
        </BaseBox>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
const profileImage = ref();
const username = ref(authStore.userName);
const email = ref("");
const firstname = ref("");
const lastname = ref("");
const street = ref("");
const zip = ref("");
const city = ref("");
const phone = ref("");
</script>
