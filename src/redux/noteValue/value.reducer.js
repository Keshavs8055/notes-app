const INITIAL_STATE = {
  noteValue: "",
};

export const NoteValue = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_VALUE":
      return {
        ...state,
        noteValue: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
