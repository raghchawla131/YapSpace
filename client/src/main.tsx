import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import './index.css'
import { AuthContextProvider } from "./context/authContext.tsx";
import { UserContextProvider } from "./context/userContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
