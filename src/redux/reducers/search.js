const initialState = {
  search: '',
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLE_SEARCH':
      return action.payLoad;
    default:
      return state.search;
  }
};

export default search;
