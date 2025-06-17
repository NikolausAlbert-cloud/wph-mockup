import { useTitleCase } from "@/hooks/useTitleCase";
import { GetUserDataType } from "@/utils/validation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type InitialUserStateType = GetUserDataType & {
  job: string;
  userStorage: any;
}

const initialState: InitialUserStateType = {
  id: "",
  name: "",
  email: "",
  password: "",
  job: "",
  userStorage: localStorage.getItem("user")
};

const TitleCase = (word: string): string => {
  return useTitleCase(word)
};

const getUserDataSlice = createSlice({
  name: "getUserData",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<InitialUserStateType>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.job = action.payload.job ? action.payload.job : "Frontend Developer";
      localStorage.setItem("user", JSON.stringify({
        id: action.payload.id,
        name: TitleCase(action.payload.name),
        job: action.payload.job ? TitleCase(action.payload.job) : "Frontend Developer",
      }));
    }
  }
});

export const { setUser } = getUserDataSlice.actions;
export default getUserDataSlice.reducer;