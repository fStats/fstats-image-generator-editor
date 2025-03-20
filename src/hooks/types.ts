import {ReactNode} from "react";

export interface DefaultProvidersProps {
    children: ReactNode
}

export interface ColorModeContent {
    toggleColorMode: () => void
}
