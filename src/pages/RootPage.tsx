import {
    Alert,
    Autocomplete,
    Box,
    Button,
    CssBaseline,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    FormLabel,
    IconButton,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Slider,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import {useCallback, useEffect, useState} from "react";
import {Color, Format, Mode, Theme} from "./types.ts";
import {Check, CopyAll, DarkMode, LightMode} from "@mui/icons-material";
import {useSnackbar} from "notistack";
import {useProject} from "../service/projects.ts";
import {Project} from "../service/types.ts";
import {colorMap} from "../decoder/color.ts";
import {useThemeSwitch} from "../hooks/useThemeSwitch.ts";

export default function RootPage() {

    const drawerWidth = 360;

    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [openAnyway, setOpenAnyway] = useState(false);

    const {toggleColorMode} = useThemeSwitch()
    const muiTheme = useTheme()

    const {data: projects} = useProject()

    const [id, setId] = useState(1);
    const [theme, setTheme] = useState<Theme>(muiTheme.palette.mode)
    const [format, setFormat] = useState<Format>("svg")
    const [mode, setMode] = useState<Mode>("week")
    const [color, setColor] = useState<Color>(theme === "dark" ? "alizarin" : "peter-river")
    const [zoom, setZoom] = useState(150)
    const [width, setWidth] = useState(800)
    const [height, setHeight] = useState(300)

    const {enqueueSnackbar} = useSnackbar();

    const imageUrl = `https://img.fstats.dev/timeline/${id}?color=${color}&theme=${theme}&format=${format}&mode=${mode}&width=${width}&height=${height}`

    const handleWindowResize = useCallback(() => setWindowWidth(window.innerWidth), [])

    useEffect(() => {
        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [handleWindowResize]);

    if (!openAnyway && windowWidth < 600) {
        return <>
            <Alert severity="warning">
                Device window is too small. Webpage not adopted for least that 600px<br/>
                <a href="#" onClick={() => setOpenAnyway(true)} style={{
                    color: "#ed6c02",
                    textDecorationColor: "#ed6c02"
                }}>Open Anyway</a>
            </Alert>
        </>
    }

    return (
        <>
            <CssBaseline/>
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
                    }} src={imageUrl} onError={({currentTarget}) => {
                        currentTarget.src = `https://dummyimage.com/${width}x${height}/ffffff/000000&text=Project+${id}+not+exist`
                    }} alt="Chart Timeline"/>
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
                    <Stack direction="row">
                        <Typography flexGrow={1} paddingLeft={4} variant="h4" align="center"
                                    paddingBottom={2}>Settings</Typography>
                        <Box>
                            <IconButton size="large" name="Theme" onClick={toggleColorMode} color="inherit">
                                {muiTheme.palette.mode === "light" ? <LightMode/> : <DarkMode/>}
                            </IconButton>
                        </Box>
                    </Stack>
                    <Divider/>
                    <List>
                        <ListItem>
                            <FormControl fullWidth>
                                <FormLabel>Zoom (Preview)</FormLabel>
                                <Stack direction="row" spacing={2}>
                                    <Slider defaultValue={zoom} value={zoom} valueLabelDisplay="auto" min={0} max={500}
                                            onChange={(_, newValue) => setZoom(newValue as number)}/>
                                    <TextField sx={{width: 60}} variant="standard" type="number" value={zoom}
                                               onChange={(event) => {
                                                   if (Number(event.target.value) > 0) setZoom(Number(event.target.value))
                                               }}/>
                                </Stack>
                            </FormControl>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <FormControl style={{paddingTop: 8}}>
                                {projects ? <Autocomplete
                                    disablePortal
                                    defaultValue={projects[0]}
                                    onChange={(_, newValue: Project | null) => {
                                        if (newValue != null) setId(newValue.id);
                                    }}
                                    options={projects.filter(project => project.is_visible).sort((a, b) => a.name.localeCompare(b.name))}
                                    getOptionLabel={(project) => project.name}
                                    sx={{width: 300}}
                                    renderInput={(params) => <TextField {...params} label="Projects"/>}
                                /> : <TextField label="ID" type="number" value={id} onChange={(event) => {
                                    if (Number(event.target.value) > 0) setId(Number(event.target.value))
                                }}/>}
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
                            <FormControl component="fieldset">
                                <FormLabel component="legend" sx={{mb: 1}}>Color</FormLabel>
                                <RadioGroup onChange={(event) => {
                                    setColor(event.target.value as Color);
                                }} row value={color} sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(24px, 1fr))',
                                    gap: 2,
                                    maxWidth: 300,
                                }}>
                                    {(Object.keys(colorMap) as Color[]).map((_color) => (
                                        <FormControlLabel key={_color} value={_color} label="" sx={{margin: 0}}
                                                          control={
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
                                                                  <Radio disableRipple checked={color === _color}
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
                                                                  {color === _color && <Check sx={{
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
                                navigator.clipboard.writeText(imageUrl).then(() => enqueueSnackbar("URL copied to clipboard", {variant: "info"}))
                            }}>Copy to clipboard</Button>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        </>
    )
}
