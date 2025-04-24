import {Color} from "../pages/types.ts";
import {Dispatch} from "react";

export interface ColorRadioGroupProps {
    color: Color
    setColor: Dispatch<Color>
}
