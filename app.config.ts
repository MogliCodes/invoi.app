export default defineAppConfig({
  ui: {
    primary: "yellow",
    gray: "slate",
    select: {
      color: {
        white: {
          outline:
            "shadow-sm bg-white dark:bg-blue-80 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
        },
        gray: {
          outline:
            "shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400",
        },
      },
    },
    pagination: {
      default: {
        activeButton: {
          color: "yellow",
          class: "font-bold underline",
        },
        inactiveButton: {
          color: "white",
        },
        firstButton: {
          color: "white",
          class: "rtl:[&_span:first-child]:rotate-180",
          icon: "i-heroicons-chevron-double-left-20-solid",
        },
        lastButton: {
          color: "white",
          class: "rtl:[&_span:last-child]:rotate-180",
          icon: "i-heroicons-chevron-double-right-20-solid",
        },
        prevButton: {
          color: "white",
          class: "rtl:[&_span:first-child]:rotate-180",
          icon: "i-heroicons-chevron-left-20-solid",
        },
        nextButton: {
          color: "white",
          class: "rtl:[&_span:last-child]:rotate-180",
          icon: "i-heroicons-chevron-right-20-solid ",
        },
      },
    },
  },
});
