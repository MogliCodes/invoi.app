<template>
  <div class="flex flex-col sm:flex-row">
    <TheSidebar v-if="authStore.isUserLoggedIn" />
    <main
      class="relative ml-auto w-10/12 bg-gray-100 px-6 py-24 dark:bg-blue-100"
    >
      <slot />
      <BaseAlert
        v-if="alertStore.isActive"
        :message="alertStore.alertMessage"
        :link="alertStore.alertLink"
        :type="alertStore.alertType"
      />
      <div class="fixed right-6 top-4 flex items-center justify-center gap-1">
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
            />
            <BaseMenuItem
              icon="i-heroicons-arrow-left-on-rectangle"
              text="Logout"
              size="sm"
              class="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-slate-100 px-4 py-2 hover:bg-slate-200 focus:border-2 focus:outline-0"
            />
          </div>
        </div>
      </div>
    </main>
    <div style="height: 2000px"></div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";

const authStore = useAuthStore();
const alertStore = useAlertStore();
const accessToken = useCookie("accessToken");
const userId = useCookie("userId");

if (accessToken.value) {
  authStore.setAccessToken(accessToken.value);
  authStore.setUserId(userId.value);
  authStore.setUserLoggedIn(true);
}

const isUserMenuActive = ref(false);
function toggleUserMenu() {
  isUserMenuActive.value = !isUserMenuActive.value;
}
const userMenu = ref(null);
onClickOutside(userMenu, () => (isUserMenuActive.value = false));
</script>
