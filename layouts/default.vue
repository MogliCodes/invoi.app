<template>
  <div class="flex flex-col sm:flex-row">
    <!--    <div-->
    <!--      class="fixed right-2 top-16 z-50 rounded-xl bg-yellow-100 p-4 text-sm text-yellow-700 shadow-lg"-->
    <!--    >-->
    <!--      <div class="flex items-center gap-4">-->
    <!--        <UIcon name="i-heroicons-information-circle" class="scale-150" />-->
    <!--        <span>Sitzung läuft ab in: {{ formattedTime }}</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <TheSidebar v-if="authStore.isUserLoggedIn" />
    <main
      class="relative ml-auto min-h-screen w-10/12 bg-gray-100 py-24 dark:bg-blue-100"
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
      <div class="fixed bottom-4 right-4 w-1/4">
        <BaseAlert
          v-if="alertStore.isActive"
          :message="alertStore.alertMessage"
          :link="alertStore.alertLink"
          :type="alertStore.alertType"
        />
      </div>
      <div
        class="fixed right-6 top-1.5 z-50 flex items-center justify-center gap-1"
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
    </main>
    <div style="height: 1000px"></div>
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

const { data: settings, refresh } = useFetch(`/api/settings/get`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${authStore.accessToken}`,
    userid: authStore.userId,
  },
});

const initials = computed<string>(() => {
  if (settings?.value?.data.firstname && settings?.value?.data.lastname) {
    return `${settings?.value.data.firstname[0]}${settings?.value.data.lastname[0]}`;
  }
  return "";
});

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
  const interval = setInterval(() => {
    if (expiresInTime.value <= 0) {
      clearInterval(interval);
      logout();
    }
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
