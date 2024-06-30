import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
import { ToastContainer } from "react-toastify";
import { ContractProvider } from "./store/wallet";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThirdwebProvider>
        <ContractProvider>
          <App />
          {/* <ToastContainer /> */}
        </ContractProvider>
      </ThirdwebProvider>
    </BrowserRouter>
  </React.StrictMode>
);
