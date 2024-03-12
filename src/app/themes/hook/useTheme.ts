import { useAppDispatch, useAppSelector} from "../../hooks";
import {changeTheme} from "../store/themes-toggle.slice"
import { Themes } from "../themes.enum";
export interface ThemeProps {
  theme?: Themes;
  toggleTheme?: () => void;
}

export const useTheme=():ThemeProps=>{
    const dispatch = useAppDispatch();
    const theme=useAppSelector((store)=>store.theme)
  
    const toggleTheme=()=>{
      dispatch(changeTheme())
    }
  return {theme, toggleTheme}
}