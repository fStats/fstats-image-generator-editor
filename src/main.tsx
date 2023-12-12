import React from 'react'
import ReactDOM from 'react-dom/client'
import RootPage from "./pages/RootPage.tsx";
import {SnackbarProvider} from "notistack";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <SnackbarProvider>
            <RootPage/>
        </SnackbarProvider>
    </React.StrictMode>
)
