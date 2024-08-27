<template>
  <table
    class="min-w-full overflow-y-hidden shadow-lg rounded-lg dark:text-gray-400"
  >
    <thead class="overflow-hidden rounded-t-lg bg-blue-90 text-white">
      <tr>
        <slot name="head"></slot>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
  </table>
</template>
