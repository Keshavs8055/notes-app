const INITIAL_STATE = {
  groupModalOpen: false,
};

export const GroupModalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "TOGGLE_GROUP_MODAL":
      return {
        ...state,
        groupModalOpen: !state.groupModalOpen,
      };
    default:
      return {
        ...state,
      };
  }
};
