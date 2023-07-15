import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HashRoutes } from "./routes.tsx";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { AppTheme } from "./_general/theme.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={AppTheme}>
        <Box sx={{ margin: "20px", textAlign: "center" }}>
          <CssBaseline />
          <RouterProvider router={HashRoutes} />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
