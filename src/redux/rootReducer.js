import { combineReducers } from "redux";
import { ModalReducer } from "./modal/modal.reducer";
import { GroupModalReducer } from "./modal/groupModal.reducer";
import { NoteValue } from "./noteValue/value.reducer";
import { UserReducer } from "./user/user.reducer";
import { userNotes } from "./userNotes/userNotes.reducer";

export const rootReducer = combineReducers({
  ModalReducer,
  NoteValue,
  UserReducer,
  GroupModalReducer,
  userNotes,
});
