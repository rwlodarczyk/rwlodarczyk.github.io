import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HashRoutes } from "./routes.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppTheme } from "./_general/theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <RouterProvider router={HashRoutes} />
    </ThemeProvider>
  </React.StrictMode>
);
