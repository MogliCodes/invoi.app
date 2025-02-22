<template>
  <div
    class="fixed right-6 top-1.5 z-50 hidden items-center justify-center gap-1 lg:flex"
  >
    <div
      class="flex size-9 items-center justify-center rounded-lg bg-white transition hover:bg-gray-50 dark:bg-blue-90"
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
        v-if="settings?.avatar"
        class="relative z-20 cursor-pointer"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
        @click="toggleUserMenu"
      />
      <span
        v-else
        class="relative z-20 flex size-8 cursor-pointer items-center justify-center rounded-full bg-gray-400 text-sm font-normal"
        @click="toggleUserMenu"
        >{{ initials }}</span
      >
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
          icon="i-heroicons-arrow-left-on-rectangle"
          text="Logout"
          size="sm"
          class="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-slate-100 px-4 py-2 hover:bg-slate-200 focus:border-2 focus:outline-0"
          @click="logout"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { useAuthStore } from "~/stores/auth.store";

const authStore = useAuthStore();
const { data: settings, refresh } = useFetch(`/api/settings/get`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});

const isUserMenuActive = ref(false);

function toggleUserMenu() {
  isUserMenuActive.value = !isUserMenuActive.value;
}

const initials = computed<string>(() => {
  if (settings?.value?.data.firstname && settings?.value?.data.lastname) {
    return `${settings?.value.data.firstname[0]}${settings?.value.data.lastname[0]}`;
  }
  return "";
});

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
</script>
