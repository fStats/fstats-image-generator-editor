import {createContext, useContext} from "react";
import {ColorModeContent} from "./types.ts";

export const ColorModeContext = createContext<ColorModeContent>({
    toggleColorMode: () => {
    }
});

export const useThemeSwitch = () => useContext(ColorModeContext);
