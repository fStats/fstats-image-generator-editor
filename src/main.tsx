import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPage from "./pages/RootPage.tsx";
import {SnackbarProvider} from "notistack";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ThemeSwitchProvider} from "./hooks/providers/ThemeSwitchProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <ThemeSwitchProvider>
                <SnackbarProvider>
                    <RootPage/>
                </SnackbarProvider>
            </ThemeSwitchProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
