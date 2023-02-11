import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { TabProvider } from "./contexts/tab.context";
import "react-toastify/dist/ReactToastify.min.css";
import { UserListProvider } from "./contexts/userList.context";
import { ContactDataProvider } from "./contexts/ContactData.context";
import { AuthProvider } from "./contexts/auth.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <TabProvider>
        <UserListProvider>
          <ContactDataProvider>
            <App />
          </ContactDataProvider>
        </UserListProvider>
      </TabProvider>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
