import {
    Alert,
    Box,
    Button,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Slider,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {Format, Mode, Theme} from "./types.ts";
import {CopyAll} from "@mui/icons-material";
import {useSnackbar} from "notistack";

export default function RootPage() {

    const drawerWidth = 360;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)

    const [theme, setTheme] = useState<Theme>("light")
    const [format, setFormat] = useState<Format>("svg")
    const [mode, setMode] = useState<Mode>("all")
    const [zoom, setZoom] = useState(200)
    const [width, setWidth] = useState(800)
    const [height, setHeight] = useState(300)

    const {enqueueSnackbar} = useSnackbar();

    const url = `https://img.fstats.dev/timeline/1?theme=${theme}&format=${format}&mode=${mode}&width=${width}&height=${height}`

    const handleWindowResize = useCallback(() => setWindowWidth(window.innerWidth), [])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [handleWindowResize]);

    if (windowWidth < 600) {
        return (
            <Alert severity="warning">Device window is too small. Minimal supported width is 600px</Alert>
        )
    }

    return (
        <Box sx={{
            display: "flex"
        }}>
            <Box component="main" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexGrow: 1,
                height: "100svh"
            }}>
                <img style={{
                    width: `${(width * zoom) / 100}px`,
                    height: `${(height * zoom) / 100}px`,
                    objectFit: 'contain',
                }} src={url} alt="Chart Timeline"/>
            </Box>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        padding: 2
                    }
                }}
                variant="permanent"
                anchor="right"
            >
                <Typography variant="h4" align="center" paddingBottom={2}>Settings</Typography>
                <Divider/>
                <List>
                    <ListItem>
                        <FormControl fullWidth>
                            <FormLabel>Zoom (Preview)</FormLabel>
                            <Slider defaultValue={zoom} valueLabelDisplay="auto" min={0} max={500}
                                    onChange={(_, newValue) => {
                                        setZoom(newValue as number)
                                    }}/>
                        </FormControl>
                    </ListItem>
                    <Divider/>
                    <ListItem>
                        <FormControl>
                            <Stack direction="row" spacing={2} paddingTop={2}>
                                <TextField label="Width" type="number" value={width} onChange={(event) => {
                                    if (Number(event.target.value) > 0) setWidth(Number(event.target.value))
                                }}/>
                                <TextField label="Height" type="number" value={height} onChange={(event) => {
                                    if (Number(event.target.value) > 0) setHeight(Number(event.target.value))
                                }}/>
                            </Stack>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl>
                            <FormLabel>Theme</FormLabel>
                            <RadioGroup row value={theme}
                                        onChange={(event) => setTheme(event.target.value as Theme)}>
                                <FormControlLabel value="light" control={<Radio/>} label="Light"/>
                                <FormControlLabel value="dark" control={<Radio/>} label="Dark"/>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl>
                            <FormLabel>Format</FormLabel>
                            <RadioGroup row value={format}
                                        onChange={(event) => setFormat(event.target.value as Format)}>
                                <FormControlLabel value="svg" control={<Radio/>} label="SVG"/>
                                <FormControlLabel value="png" control={<Radio/>} label="PNG"/>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl>
                            <FormLabel>Mode</FormLabel>
                            <RadioGroup row value={mode}
                                        onChange={(event) => setMode(event.target.value as Mode)}>
                                <FormControlLabel value="all" control={<Radio/>} label="All"/>
                                <FormControlLabel value="quarter" control={<Radio/>} label="Quarter"/>
                                <FormControlLabel value="month" control={<Radio/>} label="Month"/>
                                <FormControlLabel value="week" control={<Radio/>} label="Week"/>
                            </RadioGroup>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button fullWidth variant="contained" startIcon={<CopyAll/>} onClick={() => {
                            navigator.clipboard.writeText(url).then(() => {
                                enqueueSnackbar("URL copied to clipboard", {variant: "info"})
                            })
                        }}>Copy to clipboard</Button>
                    </ListItem>
                </List>
            </Drawer>
        </Box>
    )
}