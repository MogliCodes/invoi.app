import { useAlertStore } from "~/stores/alert";
import { useAuthStore } from "~/stores/auth.store";
export const useSettings = () => {
  const authStore = useAuthStore();
  // const alertStore = useAlertStore();
  const username = ref("");
  const email = ref("");
  const firstname = ref("");
  const lastname = ref("");
  const street = ref("");
  const zip = ref("");
  const city = ref("");
  const phone = ref("");
  const taxId = ref("");
  const vatId = ref("");
  const bankName = ref("");
  const iban = ref("");
  const bic = ref("");
  const website = ref("");

  const validUserData = computed(() => {
    return (
      !!username.value && !!email.value && !!firstname.value && !!lastname.value
    );
  });

  const validCompanyData = computed(() => {
    return (
      !!street.value &&
      !!zip.value &&
      !!city.value &&
      !!phone.value &&
      !!taxId.value &&
      !!vatId.value
    );
  });

  const validBankData = computed(() => {
    return !!bankName.value && !!iban.value && !!bic.value;
  });

  async function update() {
    return await $fetch(`/api/settings`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userid: authStore.userId,
      },
      body: {
        username: username.value,
        email: email.value,
        firstname: firstname.value,
        lastname: lastname.value,
        street: street.value,
        zipCode: zip.value,
        city: city.value,
        phone: phone.value,
        taxId: taxId.value,
        vatId: vatId.value,
        bankName: bankName.value,
        iban: iban.value,
        bic: bic.value,
        user: authStore.userId,
        currency: "EUR",
        language: "de",
      },
    });
  }

  return {
    username,
    email,
    firstname,
    lastname,
    street,
    zip,
    city,
    phone,
    taxId,
    vatId,
    bankName,
    iban,
    bic,
    website,
    validUserData,
    validCompanyData,
    validBankData,
    update,
  };
};
