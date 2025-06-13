import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarProvider} from "notistack";
import {StrictMode, Suspense} from "react";
import {createRoot} from "react-dom/client";

import {ThemeSwitchProvider} from "@hooks/providers/ThemeSwitchProvider.tsx";
import RootPage from "@pages/RootPage.tsx";

import {initPromise} from "./i18n.ts";

initPromise.then(() => {
    createRoot(document.getElementById("root")!).render(
        <StrictMode>
            <QueryClientProvider client={new QueryClient()}>
                <ThemeSwitchProvider>
                    <SnackbarProvider>
                        <Suspense>
                            <RootPage/>
                        </Suspense>
                    </SnackbarProvider>
                </ThemeSwitchProvider>
            </QueryClientProvider>
        </StrictMode>
    );
});