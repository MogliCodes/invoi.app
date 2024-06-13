export const useBulkActions = () => {
  const itemId: Ref<string> = ref("");
  const selectedItems: Ref<Array<string>> = ref([]);
  const selectAll = ref(false);
  const bulkActionOptions = [
    "Choose an action",
    "Delete",
    "Archive",
    "Copy",
    "Move",
  ];
  const bulkAction = ref(bulkActionOptions[0]);
  const isBulkDeleteModalOpen = ref(false);

  function toggleSelection(id: string) {
    const index = selectedItems.value.indexOf(id);
    if (index === -1) {
      selectedItems.value.push(id);
    } else {
      selectedItems.value.splice(index, 1);
    }
  }

  function deleteItem(id: string) {
    itemId.value = id;
    isBulkDeleteModalOpen.value = true;
  }

  function isItemSelected(id: string) {
    return selectedItems.value.includes(id);
  }

  function toggleSelectAll<T extends { _id: string }>(items: Ref<Array<T>>) {
    console.log(items.value.length);
    if (!items || !items.value.length) return;
    !selectedItems.value.length
      ? (selectedItems.value = items.value.map((item) => item._id))
      : (selectedItems.value = []);
  }

  function initiateBulkDelete() {
    isBulkDeleteModalOpen.value = true;
  }

  function executeBulkAction() {
    switch (bulkAction.value.toLowerCase()) {
      case "delete":
        initiateBulkDelete();
        break;
    }
  }

  return {
    itemId,
    selectedItems,
    selectAll,
    bulkAction,
    bulkActionOptions,
    isBulkDeleteModalOpen,
    deleteItem,
    toggleSelection,
    isItemSelected,
    toggleSelectAll,
    executeBulkAction,
  };
};
