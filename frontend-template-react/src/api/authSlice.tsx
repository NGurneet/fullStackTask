import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem("authToken"),
  isAuthenticated: !!localStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Set the authentication token and log the user in.
     * 
     * @param {string} token The authentication token.
     */
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("authToken", action.payload);
    },
   
    /**
     * Log the user out.
     * 
     * Removes the authentication token from state and localStorage, and sets
     * isAuthenticated to false.
     */
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
