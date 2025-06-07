import { User_AuthSlice } from "@/utils/validation";

type AuthState = {
  uid: string | null;
  email: string | null;
  token: string | null;
  user: User_AuthSlice | null;
}

const getUserFromLocalStorage = (): User_AuthSlice | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

const getTokenFromLocalStorage = (): string | null => {
  const token = localStorage.getItem("token");
  return token ? token : null;
}

const initialState: AuthState = {
  uid: null,
  email: null,
  token: getTokenFromLocalStorage(),
  user: getUserFromLocalStorage(),
}

const authSlice = ({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ uid: string; email: string; token: string}>) => {
      console.log("Token received in Redux: ", action.payload.token);
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    setUser: (state, action: PayloadAction<{ user: User_AuthSlice}>) => {
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

export const { login, setUser, logout} = authSlice.actions;
export default authSlice.reducer;