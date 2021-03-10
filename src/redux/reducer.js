const initialState = {
  profile: {},
  weighting: {},
  selectedWeighting: {},
  isLoading: true,
  isModalVisible: false,
  modalType: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    case 'SET_WEIGHTING':
      return {
        ...state,
        weighting: action.payload,
      };
    case 'SET_SELECTED_WEIGHTING':
      return {
        ...state,
        selectedWeighting: { ...action.payload },
      };
    case 'SET_IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'MODAL_OPEN':
      return {
        ...state,
        isModalVisible: true,
        modalType: action.payload,
      };
    case 'MODAL_CLOSE':
      return {
        ...state,
        isModalVisible: false,
      };
    default:
      return state;
  }
};

export default reducer;
