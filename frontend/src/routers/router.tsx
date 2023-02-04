import { Route, Routes } from "react-router-dom";
import CreateContact from "../pages/createContact";
import DataUser from "../pages/dataUser";
import EditContactEmail from "../pages/editContactEmail";
import EditContactPhone from "../pages/editContactPhone";
import EditUser from "../pages/editUser";
import FormUser from "../pages/formUser";

import ListUsers from "../pages/listUsers";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<ListUsers />}></Route>;
      <Route path="/register-client" element={<FormUser />}></Route>;
      <Route path="user/:id" element={<DataUser />}></Route>;
      <Route path="user/:id/contact" element={<CreateContact />}></Route>;
      <Route path="user/:id/edit" element={<EditUser />}></Route>;
      <Route
        path="contact/phone/:id/edit"
        element={<EditContactPhone />}
      ></Route>
      ;
      <Route
        path="contact/email/:id/edit"
        element={<EditContactEmail />}
      ></Route>
      ;
    </Routes>
  );
}
