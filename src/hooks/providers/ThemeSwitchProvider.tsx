import {DefaultProvidersProps} from "../types.ts";
import {createTheme, PaletteMode} from "@mui/material";
import {useMemo, useState} from "react";
import {ThemeProvider} from "@emotion/react";
import {ColorModeContext} from "../useThemeSwitch.ts";

export const ThemeSwitchProvider = (props: DefaultProvidersProps) => {
    const storedTheme = localStorage.getItem("theme") as PaletteMode;
    const [mode, setMode] = useState<PaletteMode>(storedTheme || "light");

    const toggleColorMode = () =>
        setMode((prevMode) => {
            localStorage.setItem("theme", prevMode === "light" ? "dark" : "light");
            return prevMode === "light" ? "dark" : "light";
        });

    const colorMode = useMemo(() => ({toggleColorMode}), []);

    const theme = useMemo(() => createTheme({
        palette: {mode}
    }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
