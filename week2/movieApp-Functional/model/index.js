module.exports = (currState = {}, action) => {
  switch (action.type) {
    case 'INIT_COLLECTION_LIST':
      return {
        ...currState,
        searchTerm: ''
      };
    case 'SEARCH_START':
      return {
        ...currState, searchTerm: action.searchTerm,
      };
      case 'FAV_LIST':
        return {
          ...currState, searchTerm: action.searchTerm,
          searchResults:action.searchResults,
        };
    case 'SEARCH_COMPLETE':
      return {
        ...currState,
        searchResults: action.searchResults.results,
        totalPages: action.searchResults.total_pages,
        currPge: action.searchResults.page,
        selectedList: '',
      };

    case 'MOVIES_FOR_SELECTED_LIST':
    case 'UPDATED_MOVIES_FROM_LIST':
      return {
        ...currState,
        searchResults: action.value,
        totalPages: action.pageCount,
        currPge: action.currentPage,
        searchTerm: '',
      };

    default:
      return { ...currState };
  }
};
