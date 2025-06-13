import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider} from "notistack";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";

import {ThemeSwitchProvider} from "@hooks/providers/ThemeSwitchProvider.tsx";
import RootPage from "@pages/RootPage.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <ThemeSwitchProvider>
                <SnackbarProvider>
                    <RootPage/>
                </SnackbarProvider>
            </ThemeSwitchProvider>
        </QueryClientProvider>
    </StrictMode>
);
