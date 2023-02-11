import {
  Button,
  FilledInput,
  FormControl,
  FormGroup,
  InputLabel,
} from "@mui/material";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import TabComponent from "../components/tab.component";
import { UserListContext } from "../contexts/userList.context";
import api from "../services/api";

interface IData {
  name: string;
  email?: string;
  phone?: string;
  userId?: number | undefined;
}

export default function RegisterContact() {
  const { id } = useContext(UserListContext);

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    let name: string = e.target[0].value;
    let email: string = e.target[1].value;
    let phone: string = e.target[2].value;
    let userId = id;

    let data: IData = { name: name };

    if (userId) {
      data.userId = userId;
    }

    if (email) {
      data.email = email;
    }

    if (phone) {
      data.phone = phone;
    }

    console.log(data);

    await api
      .post("contact", data)
      .then((response) => {
        e.target[0].value = "";
        e.target[1].value = "";
        e.target[2].value = "";
        toast.success("Cadastro criado com sucesso!");
      })
      .catch((error) => {
        if (
          error.response.data.message ===
          "provide a valid phone, in format (XX) XXXX-XXXX or (XX) XXXXX-XXXX"
        ) {
          toast.error("Digite um telefone com formato válido.");
        } else if (error.response.data.message === "provide a valid email") {
          toast.error("Digite um email com formato válido.");
        } else {
          toast.error("Ops, algo deu errado!");
        }
      });
  }

  return (
    <>
      <TabComponent />
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "60vh",
            mt: 4,
          }}
        >
          <FormControl variant="filled" sx={{ mt: 4 }} focused>
            <InputLabel htmlFor="name" required>
              Nome
            </InputLabel>
            <FilledInput
              id="name"
              sx={{ color: "white", width: "calc(450px + 2vmin)" }}
              required
            />
          </FormControl>
          <FormControl variant="filled" sx={{ mt: 4 }} focused>
            <InputLabel htmlFor="email" required>
              E-mail
            </InputLabel>
            <FilledInput
              id="email"
              sx={{ color: "white", width: "calc(450px + 2vmin)" }}
            />
          </FormControl>
          <FormControl variant="filled" sx={{ mt: 4 }} focused>
            <InputLabel htmlFor="phone" required>
              Telefone
            </InputLabel>
            <FilledInput
              id="phone"
              sx={{ color: "white", width: "calc(450px + 2vmin)" }}
            />
          </FormControl>
          <Button
            variant="outlined"
            type="submit"
            sx={{ marginTop: 5, padding: "8px 25px" }}
          >
            Salvar
          </Button>
        </FormGroup>
      </form>
    </>
  );
}
