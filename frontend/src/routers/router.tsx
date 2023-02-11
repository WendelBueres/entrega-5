import { Route, Routes } from "react-router-dom";
import CreateContact from "../pages/createContact";
import DataContact from "../pages/dataContact";
import EditContact from "../pages/editContact";
import EditContactEmail from "../pages/editContactEmail";
import EditContactPhone from "../pages/editContactPhone";
import EditUser from "../pages/editUser";
import ListUsers from "../pages/listUsers";
import Login from "../pages/login";
import RegisterContact from "../pages/registerContact";
import RegisterUser from "../pages/registerUser";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>;
      <Route path="/contacts" element={<ListUsers />}></Route>;
      <Route path="/register-user" element={<RegisterUser />}></Route>;
      <Route path="/register-contact" element={<RegisterContact />}></Route>;
      <Route path="contact/:id" element={<DataContact />}></Route>;
      <Route path="/contact/:id/created" element={<CreateContact />}></Route>;
      <Route path="contact/:id/edit" element={<EditContact />}></Route>;
      <Route path="user/edit" element={<EditUser />}></Route>;
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
