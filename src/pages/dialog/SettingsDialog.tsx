import {Close as CloseIcon} from "@mui/icons-material";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    IconButton,
    MenuItem,
    Select,
    Switch,
    Typography,
    useTheme
} from "@mui/material";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";

import {useThemeSwitch} from "@hooks/useThemeSwitch.ts";
import {supportedLanguages} from "@i18n";

import {SettingsDialogProps} from "./types";

export function SettingsDialog(props: SettingsDialogProps) {
    const theme = useTheme();
    const {t, i18n} = useTranslation();

    const {toggleColorMode} = useThemeSwitch();

    const handleClose = () => props.setIsDialogOpen(false);

    const languageOptions = useMemo(() => {
        const englishDisplayNames = new Intl.DisplayNames(["en"], {type: "language"});

        return supportedLanguages.map(langCode => ({
            value: langCode,
            label: englishDisplayNames.of(langCode) || langCode,
            nativeLabel: new Intl.DisplayNames([langCode], {type: "language"}).of(langCode) || langCode
        })).sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    return (
        <Dialog open={props.isDialogOpen} onClose={handleClose} fullWidth>
            <DialogTitle align="center">
                {t("settings.label")}
                <IconButton onClick={handleClose} sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: theme.palette.grey[500],
                }}>
                    <CloseIcon/>
                </IconButton>
            </DialogTitle>

            <DialogContent>
                <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>

                    <Box>
                        <Typography color="text.secondary" sx={{mb: 1}}>
                            {t("settings.appearance")}
                        </Typography>
                        <FormControlLabel
                            control={<Switch checked={theme.palette.mode === "dark"} onChange={toggleColorMode}/>}
                            label={t("settings.darkMode")}
                            labelPlacement="start"
                            sx={{
                                justifyContent: "space-between",
                                marginLeft: 0,
                                width: "100%",
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography color="text.secondary" sx={{mb: 1}}>
                            {t("settings.language")}
                        </Typography>
                        <FormControl fullWidth size="medium">
                            <Select value={i18n.language} onChange={(event) => {
                                i18n.changeLanguage(event.target.value);
                            }}>
                                {languageOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        <Box>
                                            <Typography>
                                                {option.label}
                                            </Typography>
                                            {option.nativeLabel !== option.label && (
                                                <Typography variant="caption" color="text.secondary">
                                                    {option.nativeLabel}
                                                </Typography>
                                            )}
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                </Box>
            </DialogContent>
        </Dialog>
    );
}