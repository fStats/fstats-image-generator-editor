import {Dispatch} from "react";

import {Color} from "@pages/types.ts";

export interface ColorRadioGroupProps {
    color: Color
    setColor: Dispatch<Color>
}
