import { GetUserDataType } from "@/utils/validation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GetUserDataType = {
  id: "",
  name: "",
  email: "",
  password: "",
};

const getUserDataSlice = createSlice({
  name: "getUserData",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<GetUserDataType>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.password = action.payload.password;
    }
  }
});

export const { setUser } = getUserDataSlice.actions;
export default getUserDataSlice.reducer;