<template>
  <section>
    <div class="w-2/3">
      <BaseHeadline
        type="h1"
        class="mb-8 dark:text-white"
        text="Import contacts"
      />
      <BaseHeadline type="h2" text="Import your contacts" />
      <BaseBox>
        <div class="w-2/3">
          <BaseHeadline
            class="mb-4 dark:text-white"
            type="h3"
            text="How to import your own data"
          />
          <p class="mb-8 dark:text-white">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            autem culpa, dolores dolorum eos inventore iure iusto laboriosam,
            molestias quae qui quod rem unde? Amet ipsa magnam quia quibusdam
            voluptatum!
          </p>
          <UInput class="mb-6" type="file" />
          <BaseButton text="Upload contacts" />
        </div>
      </BaseBox>
      <BaseHeadline class="mt-8" type="h2" text="Demo data" />
      <BaseBox>
        <div class="flex w-2/3 flex-col items-start gap-4">
          <BaseHeadline
            class="dark:text-white"
            type="h3"
            text="Create demo data"
          />
          <BaseText>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores
            dolores eveniet in perferendis sed? Adipisci, beatae cumque deserunt
            dolore ea, ex illo ipsum laboriosam laudantium numquam quis rem sed
            voluptates?
          </BaseText>
          <div class="flex gap-4">
            <BaseButton text="Create demo data" @click="createDemoContacts" />
            <BaseButton
              variant="red"
              text="Delete demo contacts"
              @click="delteDemoContacts"
            />
          </div>
        </div>
      </BaseBox>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
const authStore = useAuthStore();
const userId = authStore.userId;
const accessToken = authStore.accessToken;

async function createDemoContacts() {
  useFetch(`/api/contacts/demo`, {
    method: "POST",
    headers: {
      userId,
      authorization: `Bearer ${accessToken}`,
    },
  });
}

async function delteDemoContacts() {
  useFetch(`/api/contacts/demo`, {
    method: "DELETE",
    headers: {
      userId,
      authorization: `Bearer ${accessToken}`,
    },
  });
}
</script>
