import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { RecoilRoot } from "recoil";
// RecoilRoot이란, react-recoil을 사용하기 위한 컴포넌트이다.

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// react-query를 사용하기 위해 QueryClientProvider를 적용한다.
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
