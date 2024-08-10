<template>
  <div class="flex flex-col sm:flex-row">
    <div
      class="fixed shadow-lg p-4 rounded-xl text-sm top-16 right-2 bg-yellow-100 text-yellow-700 z-50"
    >
      <div class="flex gap-4 items-center">
        <UIcon name="i-heroicons-information-circle" class="scale-150" />
        <span>Sitzung läuft ab in: {{ formattedTime }}</span>
      </div>
    </div>
    <TheSidebar v-if="authStore.isUserLoggedIn" />
    <main
      class="relative ml-auto w-10/12 bg-gray-100 py-24 dark:bg-blue-100 min-h-screen"
    >
      <StickyElement
        v-if="useRoute().meta.title"
        class="mb-3"
        visible-on-direction="disabled"
      >
        <BaseHeadline
          class="pl-6 first-letter:uppercase dark:text-white"
          type="h1"
          :text="useRoute().meta.title"
        />
      </StickyElement>
      <div class="p-6 pt-0">
        <slot />
      </div>
      <BaseAlert
        v-if="alertStore.isActive"
        :message="alertStore.alertMessage"
        :link="alertStore.alertLink"
        :type="alertStore.alertType"
      />
      <div
        class="fixed right-6 top-1.5 z-50 flex items-center justify-center gap-1"
      >
        <div
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-white transition hover:bg-gray-50 dark:bg-blue-90"
        >
          <UIcon
            class="cursor-pointer text-2xl text-gray-500 dark:text-gray-300"
            name="i-heroicons-bell"
          ></UIcon>
        </div>
        <div class="">
          <ColorModeButton />
        </div>
        <div class="relative flex">
          <UAvatar
            class="relative z-20 cursor-pointer"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
            @click="toggleUserMenu"
          />
          <div
            ref="userMenu"
            class="absolute right-0 top-10 origin-top-right rounded-lg bg-gray-100 p-2 shadow-xl transition"
            :class="isUserMenuActive ? 'scale-1' : 'scale-0'"
          >
            <BaseMenuItem
              to="/settings"
              icon="i-heroicons-cog-6-tooth"
              text="Settings"
              size="sm"
              class="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-slate-100 px-4 py-2 hover:bg-slate-200 focus:border-2 focus:outline-0"
              @click="toggleUserMenu"
            />
            <BaseMenuItem
              @click="logout"
              icon="i-heroicons-arrow-left-on-rectangle"
              text="Logout"
              size="sm"
              class="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-slate-100 px-4 py-2 hover:bg-slate-200 focus:border-2 focus:outline-0"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import StickyElement from "vue-sticky-element";
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
const route = useRoute();
const authStore = useAuthStore();
const alertStore = useAlertStore();
const accessToken = useCookie("accessToken");
const userId = useCookie("userId");

if (accessToken.value) {
  authStore.setAccessToken(accessToken.value);
  authStore.setUserId(userId.value);
  authStore.setUserLoggedIn(true);
} else {
  navigateTo("/login");
}

const isUserMenuActive = ref(false);
function toggleUserMenu() {
  isUserMenuActive.value = !isUserMenuActive.value;
}
const userMenu = ref(null);
onClickOutside(userMenu, () => (isUserMenuActive.value = false));

async function logout() {
  const response = await $fetch("/api/logout", {
    method: "POST",
    body: {
      userId: authStore.userId,
    },
  });
  if (response.status === 200) {
    authStore.setUserLoggedIn(false);
    authStore.setAccessToken(null);
    authStore.setUserId(null);
    navigateTo("/login");
  }
}

const expiresInTime: Ref<number> = ref(authStore.expiration);

const formattedTime = computed<string>(() => {
  const days = Math.floor(expiresInTime.value / 86400000);
  const hours = Math.floor((expiresInTime.value % 86400000) / 3600000);
  const minutes = Math.floor(expiresInTime.value / (1000 * 60)) % 60;
  const seconds = ((expiresInTime.value % 60000) / 1000).toFixed(0);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
});
onMounted(() => {
  setInterval(() => {
    console.log(expiresInTime.value);
    expiresInTime.value -= 1000;
  }, 1000);
});

// function formatExpirationDate(time: number): string {
//   // decrease time by 1 second
//   time -= 1000;
//   console.log(time);
//   const days = Math.floor(time / 86400000);
//   const hours = Math.floor((time % 86400000) / 3600000);
//   const minutes = Math.floor(time / (1000 * 60)) % 60;
//   const seconds = ((time % 60000) / 1000).toFixed(0);
//
//   return `${days}d ${hours}h ${minutes}m ${seconds}s`;
// }
</script>

<style>
.vue-sticky-element--stuck {
  @apply !bg-white dark:text-black !shadow-lg text-base py-3;
  background: white;
}
</style>
