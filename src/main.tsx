import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPage from "./pages/RootPage.tsx";
import {SnackbarProvider} from "notistack";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <SnackbarProvider>
                <RootPage/>
            </SnackbarProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
