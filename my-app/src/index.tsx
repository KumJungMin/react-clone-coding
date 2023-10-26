import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { ThemeProvider } from "styled-components";
import {theme} from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// react-query를 사용하기 위해 QueryClientProvider를 적용한다.
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
      </QueryClientProvider>
  </React.StrictMode>
);
