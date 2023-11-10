<template>
  <div class="flex flex-col sm:flex-row">
    <TheSidebar v-if="authStore.isUserLoggedIn" />
    <main class="bg-slate-100 relative w-full bg-white p-12 py-24">
      <slot />
      <BaseAlert
        v-if="alertStore.isActive"
        :message="alertStore.alertMessage"
        :type="alertStore.alertType"
      />
      <div class="fixed top-4 right-12">
        <div class="relative">
          <UAvatar
            @click="toggleUserMenu"
            class="relative z-20 cursor-pointer"
            src="https://avatars.githubusercontent.com/u/739984?v=4"
            alt="Avatar"
          />
          <div
            class="bg-slate-100 absolute top-10 right-0 shadow-xl px-2 py-2 rounded-lg transition origin-top-right"
            :class="isUserMenuActive ? 'scale-1' : 'scale-0'"
          >
            <div
              class="py-2 px-4 hover:bg-slate-200 cursor-pointer rounded-lg flex gap-2 items-center"
            >
              <UIcon name="i-heroicons-bell" />
              <span>Notifications</span>
            </div>
            <NuxtLink
              to="/settings"
              class="py-2 px-4 hover:bg-slate-200 cursor-pointer rounded-lg flex gap-2 items-center"
            >
              <UIcon name="i-heroicons-cog-6-tooth" />
              <span>Settings</span>
            </NuxtLink>
            <div
              class="py-2 px-4 hover:bg-slate-200 cursor-pointer rounded-lg flex gap-2 items-center"
            >
              <UIcon name="i-heroicons-arrow-left-on-rectangle" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
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
</script>
