<template>
  <div class="flex flex-col sm:flex-row">
    <TheSidebar v-if="authStore.isUserLoggedIn" />
    <main
      class="bg-gray-100 dark:bg-blue-100 relative ml-auto w-10/12 px-6 py-24"
    >
      <slot />
      <BaseAlert
        v-if="alertStore.isActive"
        :message="alertStore.alertMessage"
        :type="alertStore.alertType"
      />
      <div class="fixed top-4 right-12 flex gap-1 justify-center items-center">
        <div
          class="bg-white dark:bg-blue-90 hover:bg-gray-50 transition flex items-center justify-center rounded-lg w-9 h-9"
        >
          <UIcon
            class="text-2xl text-gray-600 cursor-pointer"
            name="i-heroicons-bell"
          ></UIcon>
        </div>
        <div class="">
          <ColorModeButton />
        </div>
        <div class="relative flex">
          <UAvatar
            @click="toggleUserMenu"
            class="relative z-20 cursor-pointer"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div
            ref="userMenu"
            class="bg-gray-100 absolute top-10 right-0 shadow-xl px-2 py-2 rounded-lg transition origin-top-right"
            :class="isUserMenuActive ? 'scale-1' : 'scale-0'"
          >
            <BaseMenuItem
              to="/settings"
              icon="i-heroicons-cog-6-tooth"
              text="Settings"
              size="sm"
              class="py-2 px-4 hover:bg-slate-200 focus:outline-0 border-2 border-slate-100 focus:border-2 cursor-pointer rounded-lg flex gap-2 items-center"
            />
            <BaseMenuItem
              icon="i-heroicons-arrow-left-on-rectangle"
              text="Logout"
              size="sm"
              class="py-2 px-4 hover:bg-slate-200 focus:outline-0 border-2 border-slate-100 focus:border-2 cursor-pointer rounded-lg flex gap-2 items-center"
            />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";
import { onClickOutside } from "@vueuse/core";

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
onClickOutside(userMenu, (event) => (isUserMenuActive.value = false));
</script>
