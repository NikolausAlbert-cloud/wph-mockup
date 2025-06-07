import { UserStorage } from "@/utils/validation";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  uid: string | null;
  email: string | null;
  token: string | null;
  user: UserStorage | null;
}

const getUserFromLocalStorage = (): UserStorage | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
}

const initialState: AuthState = {
  uid: null,
  email: null,
  token: getTokenFromLocalStorage(),
  user: getUserFromLocalStorage(),
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginOauth: (state, action: PayloadAction<{ uid: string; email: string; token: string}>) => {
      console.log("Token received in Redux: ", action.payload.token);
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    setUser: (state, action: PayloadAction<{ user: UserStorage}>) => {
      console.log("User received in Redux: ", action.payload.user);
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.uid = null;
      state.email = null;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
});

export const { loginOauth, setUser, logout} = authSlice.actions;
export default authSlice.reducer;