import { useAuthStore } from "~/stores/auth.store";

export const useClients = () => {
  const authStore = useAuthStore();

  function fetchOne(id: string) {
    return $fetch(`/api/clients/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userid: authStore.userId,
      },
    });
  }

  return {
    fetchOne,
  };
};
