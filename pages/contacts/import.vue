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
            class="dark:text-white mb-4"
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
            <BaseButton text="Create demo data" />
            <BaseButton variant="red" text="Delete demo contacts" />
          </div>
        </div>
      </BaseBox>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
