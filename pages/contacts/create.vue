<template>
  <div>
    <BaseHeadline class="mb-8" type="h1" text="Create contact" />
    <form action="">
      <div class="mb-3">
        <label class="block" for="username">First name</label>
        <BaseInput v-model="firstname" />
      </div>
      <div class="mb-3">
        <label class="block" for="username">Last name</label>
        <BaseInput v-model="lastname" />
      </div>
      <div class="mb-3">
        <label class="block" for="username">DOB</label>
        <BaseInput v-model="dob" />
      </div>
    </form>
  </div>
</template>
