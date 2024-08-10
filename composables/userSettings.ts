import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";

export const useUserSettings = () => {
  const config = useRuntimeConfig();
  const backendBaseUrl = config.public.BACKEND_BASE_URL;

  const authStore = useAuthStore();
  const alertStore = useAlertStore();
  const profileImage = ref();
  const username = ref(authStore.userName);
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

  const invoiceNumberSchema = ref("");
  const additionalTextForEndOfInvoices = ref("");
  const additionalTextForReverseChargeInvoices = ref("");

  const hourlyRate = ref("");
  const dailyRate = ref("");
  const taxRate = ref("");

  // useFetch post call to update settings
  async function updateSettings() {
    const res = await $fetch(`${backendBaseUrl}/restapi/settings`, {
      method: "PATCH",
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
        invoiceNumberSchema: invoiceNumberSchema.value,
        additionalTextForEndOfInvoices: additionalTextForEndOfInvoices.value,
        additionalTextForReverseChargeInvoices:
          additionalTextForReverseChargeInvoices.value,
        defaultHourlyRate: hourlyRate.value,
        defaultDailyRate: dailyRate.value,
        defaultTaxRate: taxRate.value,
      },
    });
    if (res.status === 201) {
      refresh();
      alertStore.setAlert("success", res.message);
      setTimeout(() => {
        alertStore.resetAlert();
      }, 5e3);
    }
  }

  return {
    profileImage,
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
    invoiceNumberSchema,
    additionalTextForEndOfInvoices,
    additionalTextForReverseChargeInvoices,
    hourlyRate,
    dailyRate,
    taxRate,
  };
};
