import { createSlice } from "@reduxjs/toolkit";
import { Themes } from "../themes.enum";


export const LOCAL_STORAGE_KEY = "theme";

const defaultTheme =
  (localStorage.getItem(LOCAL_STORAGE_KEY) as Themes) || Themes.LIGHT;

export const themeReducer = createSlice({
  name: "theme",
  initialState: defaultTheme,
  reducers: {
    changeTheme: (state) => {
      const newTheme=state === Themes.DARK ? Themes.LIGHT : Themes.DARK
      localStorage.setItem(LOCAL_STORAGE_KEY,newTheme)
      return (state = newTheme);
    },
  },
});

export const { changeTheme } = themeReducer.actions;
export default themeReducer.reducer;
