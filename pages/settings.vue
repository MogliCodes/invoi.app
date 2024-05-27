<template>
  <div class="w-2/3">
    <BaseHeadline class="mb-6 dark:text-white" text="Settings" type="h1" />

    <div v-if="!settings?.data">
      <p>No settings yet.</p>
      <BaseButton @click="initSettigns" text="Initialize settings" />
    </div>
    <div v-else>
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
            <div>
              <BaseText>
                <label for="">Username</label>
              </BaseText>
              <BaseInput v-model="username" placeholder="Username" />
            </div>
            <div>
              <BaseText>
                <label for="">E-Mail</label>
              </BaseText>
              <BaseInput v-model="email" placeholder="E-Mail" />
            </div>
            <div>
              <BaseText>
                <label for="">Firstname</label>
              </BaseText>
              <BaseInput v-model="firstname" placeholder="Firstname" />
            </div>
            <div>
              <BaseText><label>Lastname</label></BaseText>
              <BaseInput v-model="lastname" placeholder="Lastname" />
            </div>
            <div>
              <BaseText>
                <label for="">Street</label>
              </BaseText>
              <BaseInput v-model="street" placeholder="Street" />
            </div>
            <div>
              <BaseText>
                <label for="">ZIP</label>
              </BaseText>
              <BaseInput v-model="zip" placeholder="ZIP" />
            </div>
            <div>
              <BaseText>
                <label for="">City</label>
              </BaseText>
              <BaseInput v-model="city" placeholder="City" />
            </div>
            <div>
              <BaseText><label>Phone</label></BaseText>
              <BaseInput v-model="phone" placeholder="Phone" />
            </div>
            <div>
              <BaseText>
                <label>Tax ID</label>
              </BaseText>
              <BaseInput v-model="taxId" placeholder="Steuernummer" />
            </div>
            <div>
              <BaseText>
                <label>VAT ID</label>
              </BaseText>
              <BaseInput v-model="vatId" placeholder="Umsatzsteuer-ID" />
            </div>
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
                  <BaseInput
                    v-model="phone"
                    placeholder="2023-001 (YYYY-XXX)"
                  />
                </div>
                <div>
                  <label class="dark:text-white" for=""
                    >Invoice front page</label
                  >
                  <BaseInput
                    v-model="phone"
                    placeholder="Thanks for working with us!"
                  />
                </div>
                <div>
                  <label class="dark:text-white" for=""
                    >Invoice due notice</label
                  >
                  <BaseInput
                    v-model="phone"
                    placeholder="Please transfer the amount by"
                  />
                </div>
                <div>
                  <label>Additional Text for End of Invoices</label>
                  <textarea
                    class="font-inherit w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-1 text-yellow-dark focus:border-2 focus:border-yellow-normal focus:outline-0 dark:border-white dark:border-opacity-20 dark:bg-black dark:bg-opacity-20 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-yellow-300"
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <label>Additional Text for Reverse Charge Invoices</label>
                  <textarea
                    class="font-inherit w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-1 text-yellow-dark focus:border-2 focus:border-yellow-normal focus:outline-0 dark:border-white dark:border-opacity-20 dark:bg-black dark:bg-opacity-20 dark:text-gray-100 dark:placeholder:text-gray-600 dark:focus:border-yellow-300"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </BaseBox>
        </div>
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
      user: authStore.userId,
      currency: "EUR",
      language: "de",
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

async function initSettigns() {
  const res = await $fetch(`${backendBaseUrl}/restapi/settings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authStore.accessToken}`,
      userid: authStore.userId,
    },
    body: {
      username: username?.value || "test",
      email: email?.value || "test",
      firstname: firstname?.value || "test",
      lastname: lastname?.value || "test",
      street: street?.value || "test",
      zipCode: zip?.value || "test",
      city: city?.value || "test",
      phone: phone?.value || "test",
      taxId: taxId?.value || "test",
      vatId: vatId?.value || "test",
      bankName: bankName?.value || "test",
      iban: iban?.value || "test",
      bic: bic?.value || "test",
      user: authStore?.userId || "test",
      currency: "EUR",
      language: "de",
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
</script>
