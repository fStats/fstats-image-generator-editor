import {Color} from "../pages/types.ts";
import {colorMap} from "../decoder/color.ts";
import {Box, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {Check} from "@mui/icons-material";
import {ColorRadioGroupProps} from "./types.ts";

export function ColorRadioGroup(props: ColorRadioGroupProps) {
    return <RadioGroup onChange={(event) => {
        props.setColor(event.target.value as Color)
    }} row value={props.color} sx={{
        marginY: 1.2,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(24px, 1fr))',
        gap: 2,
        maxWidth: 300,
    }}>
        {(Object.keys(colorMap) as Color[]).map((_color) => (
            <FormControlLabel key={_color} value={_color} label="" sx={{margin: 0}} control={
                <Box sx={{
                    position: 'relative',
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: colorMap[_color],
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                }}>
                    <Radio disableRipple checked={props.color === _color}
                           value={_color} sx={{
                        opacity: 0,
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        m: 0,
                        p: 0,
                    }}
                    />
                    {props.color === _color && <Check sx={{
                        color: '#fff',
                        fontSize: 16,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}/>}
                </Box>
            }/>
        ))}
    </RadioGroup>;
}
