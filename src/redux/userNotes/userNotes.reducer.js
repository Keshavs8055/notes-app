const INITIAL_STATE = {
  userNotes: "",
};

export const userNotes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_USER_NOTES":
      return {
        ...state,
        userNotes: action.payload,
      };
    case "SET_MAIN_NOTES_DATA":
      return {
        ...state,
        mainUserNotes: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
