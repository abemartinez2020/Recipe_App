const filters = {
  searchText: '',
};

const getFilters = () => filters;

const setFilters = (updates) => {
  filters.searchText = updates.searchText;
};
export { getFilters, setFilters };
