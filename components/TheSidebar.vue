<template>
  <aside class="w-1/6 bg-blue-dark p-12">
    <div class="mb-12">
      <span class="text-gray-500 text-xl font-bold">Invoi.app</span>
    </div>
    <nav>
      <ul class="block">
        <li class="block">
          <nuxt-link
            to="/dashboard"
            class="block p-4 text-white"
            active-class="bg-yellow-normal text-yellow-dark"
            >Dashboard</nuxt-link
          >
        </li>
        <li class="block">
          <nuxt-link
            to="/clients"
            class="block p-4 text-white"
            active-class="bg-yellow-normal text-yellow-dark"
            >Clients</nuxt-link
          >
        </li>
        <li class="block">
          <nuxt-link
            to="/invoices"
            class="block p-4 text-white"
            active-class="bg-yellow-normal text-yellow-dark"
            >Invoices</nuxt-link
          >
        </li>

        <li class="block">
          <nuxt-link
            to="/proposals"
            class="block p-4 text-white"
            active-class="bg-yellow-normal text-yellow-dark"
            >Proposals</nuxt-link
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>
