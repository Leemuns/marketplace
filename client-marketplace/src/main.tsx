import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";

import App from "./App.tsx";
// import theme from "./theme.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <ThemeProvider theme={theme}>
  //   <CssBaseline />
  <Router>
    <QueryClientProvider client={queryClient}>
      <StrictMode>
        <App />
      </StrictMode>
    </QueryClientProvider>
  </Router>,
  // </ThemeProvider>,
);
