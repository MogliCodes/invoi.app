<template>
  <table
    class="min-w-full overflow-hidden rounded-lg shadow-lg dark:text-gray-400"
  >
    <thead class="overflow-hidden rounded-t-lg bg-blue-90 text-white">
      <tr>
        <slot name="head"></slot>
      </tr>
    </thead>
    <tbody>
      <slot name="body"></slot>
    </tbody>
    <tfoot>
      <slot name="foot"></slot>
    </tfoot>
  </table>
</template>
