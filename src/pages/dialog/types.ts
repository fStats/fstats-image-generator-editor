import {Dispatch} from "react";

export interface SettingsDialogProps {
    isDialogOpen: boolean;
    setIsDialogOpen: Dispatch<boolean>;
}