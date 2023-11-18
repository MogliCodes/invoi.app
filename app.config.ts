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
    modal: {
      overlay: {
        background: "bg-black dark:bg-black bg-opacity-60 dark:bg-opacity-60",
      },
      padding: "p-8",
      background: "dark:bg-blue-80  bg-white ",
    },
    textarea: {
      color: {
        white: {
          outline:
            "focus:ring-0 ring-0 font-inherit w-full rounded-lg border-2 border-gray-200 bg-gray-100 text-yellow-dark focus:border-2 focus:border-yellow-normal focus:outline-0 dark:border-white dark:border-opacity-20 dark:bg-black dark:bg-opacity-20 dark:text-gray-100 dark:placeholder-gray-600 dark:focus:border-yellow-300",
        },
      },
    },
  },
});
