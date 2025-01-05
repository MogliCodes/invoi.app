import { useAlertStore } from "~/stores/alert";
import { useAuthStore } from "~/stores/auth.store";
export const useSettings = () => {
  const authStore = useAuthStore();
  // const alertStore = useAlertStore();
  const username = useState("username", () => "");
  const email = useState("email", () => "");
  const firstname = useState("firstname", () => "");
  const lastname = useState("lastname", () => "");
  const street = useState("street", () => "");
  const zip = useState("zip", () => "");
  const city = useState("city", () => "");
  const phone = useState("phone", () => "");
  const taxId = useState("taxId", () => "");
  const vatId = useState("vatId", () => "");
  const bankName = useState("bankName", () => "");
  const iban = useState("iban", () => "");
  const bic = useState("bic", () => "");
  const website = useState("website", () => "");

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

  async function fetchSettings() {
    console.log("fetchSettings");
    const response = await $fetch(`/api/settings/get`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.accessToken}`,
        userid: authStore.userId,
      },
    });
    if (response) {
      console.log("response", response);
      username.value = response.data.username;
      email.value = response.data.email;
      firstname.value = response.data.firstname;
      lastname.value = response.data.lastname;
      street.value = response.data.street;
      zip.value = response.data.zipCode;
      city.value = response.data.city;
      phone.value = response.data.phone;
      taxId.value = response.data.taxId;
      vatId.value = response.data.vatId;
      bankName.value = response.data.bankName;
      iban.value = response.data.iban;
      bic.value = response.data.bic;
      website.value = response.data.website;
    }
  }

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
    fetchSettings,
    update,
  };
};
