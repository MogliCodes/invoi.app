<template>
  <div class="w-2/3">
    <BaseHeadline class="mb-6 dark:text-white" text="Settings" type="h1" />
    <BaseHeadline
      class="mb-2 text-xl font-bold dark:text-white"
      text="General"
      type="h2"
    />
    <div class="flex flex-col gap-6">
      <BaseBox>
        <BaseHeadline
          class="mb-2 text-xl font-bold dark:text-white"
          text="User information"
          type="h3"
        />
        <div class="mb-6 flex w-2/3 flex-col gap-3">
          <div>
            <label class="dark:text-white" for="">Profile image</label>
            <BaseInput
              v-model="profileImage"
              type="file"
              placeholder="Username"
            />
          </div>
          <BaseInput v-model="username" placeholder="Username" />
          <BaseInput v-model="email" placeholder="E-Mail" />
          <BaseInput v-model="firstname" placeholder="Firstname" />
          <BaseInput v-model="lastname" placeholder="Lastname" />
          <BaseInput v-model="street" placeholder="Street" />
          <BaseInput v-model="zip" placeholder="ZIP" />
          <BaseInput v-model="city" placeholder="City" />
          <BaseInput v-model="phone" placeholder="Phone" />
          <BaseInput v-model="taxId" placeholder="Steuernummer" />
          <BaseInput v-model="vatId" placeholder="Umsatzsteuer-ID" />
        </div>
        <BaseHeadline
          class="mb-2 text-xl font-bold dark:text-white"
          text="Bank information"
          type="h3"
        />
        <div class="mb-6 flex w-2/3 flex-col gap-3">
          <BaseInput v-model="bankName" placeholder="Bank name" />
          <BaseInput v-model="iban" placeholder="IBAN" />
          <BaseInput v-model="bic" placeholder="BIC" />
        </div>
        <BaseButton text="Save settings" @click="updateSettings" />
      </BaseBox>
      <div>
        <BaseHeadline
          class="text-xl font-bold dark:text-white"
          text="Templates"
          type="h2"
        />
        <BaseBox>
          <div>
            <BaseHeadline
              class="mb-2 font-bold dark:text-white"
              text="Invoices"
              type="h3"
            />
            <div class="flex w-2/3 flex-col gap-3">
              <div>
                <label class="dark:text-white" for=""
                  >Invoice number schema</label
                >
                <BaseInput v-model="phone" placeholder="2023-001 (YYYY-XXX)" />
              </div>
              <div>
                <label class="dark:text-white" for="">Invoice front page</label>
                <BaseInput
                  v-model="phone"
                  placeholder="Thanks for working with us!"
                />
              </div>
              <div>
                <label class="dark:text-white" for="">Invoice due notice</label>
                <BaseInput
                  v-model="phone"
                  placeholder="Please transfer the amount by"
                />
              </div>
            </div>
          </div>
        </BaseBox>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useAlertStore } from "~/stores/alert";

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

const config = useRuntimeConfig();
const backendBaseUrl = config.public.BACKEND_BASE_URL;
const { data: settings, refresh } = useFetch(
  `${backendBaseUrl}/restapi/settings`,
  {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
  }
);

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
    },
  });
  console.log(res);
  if (res.status === 201) {
    refresh();
    alertStore.setAlert("success", res.message);
    setTimeout(() => {
      alertStore.resetAlert();
    }, 5e3);
  }
}

// watch settings, if settings changes, initialize all refs
watch(settings, () => {
  username.value = settings.value.data.username;
  email.value = settings.value.data.email;
  firstname.value = settings.value.data.firstname;
  lastname.value = settings.value.data.lastname;
  street.value = settings.value.data.street;
  zip.value = settings.value.data.zipCode;
  city.value = settings.value.data.city;
  phone.value = settings.value.data.phone;
  taxId.value = settings.value.data.taxId;
  vatId.value = settings.value.data.vatId;
  bankName.value = settings.value.data.bankName;
  iban.value = settings.value.data.iban;
  bic.value = settings.value.data.bic;
});
</script>
