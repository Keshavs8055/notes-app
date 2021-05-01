const INITIAL_STATE = {
  modalOpen: false,
};

export const ModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_MODAL":
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    default:
      return {
        ...state,
      };
  }
};
