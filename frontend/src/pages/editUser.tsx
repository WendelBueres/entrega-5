import {
  Button,
  FilledInput,
  FormControl,
  FormGroup,
  InputLabel,
  Container,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BarClient from "../components/barContact";
import { ContactDataContext } from "../contexts/ContactData.context";
import { UserListContext } from "../contexts/userList.context";
import api from "../services/api";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { setId } = useContext(ContactDataContext);
  const { response, setResponse } = useContext(UserListContext);

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    let data = {};
    let name: string = e.target[0].value;
    let email: string = e.target[1].value;
    let senha: string = e.target[2].value;

    if (senha) {
      data = {
        name: name,
        email: email,
        password: senha,
      };
    } else {
      data = {
        name: name,
        email: email,
      };
    }

    await api
      .patch(`users/`, data)
      .then((response) => {
        toast.success("Cadastro editado com sucesso!");
        setResponse(response.data);
        navigate(`/contacts/`);
      })
      .catch((error) => {
        toast.error("Ops, algo deu errado!");
      });
  }

  async function handleDelete() {
    await api
      .delete(`users`)
      .then(async (response) => {
        toast.success("Cadastro apagado com sucesso!");
        setId(undefined);
        navigate(`/`);
      })
      .catch((error) => {
        toast.error("Ops, algo deu errado!");
      });
  }

  return (
    <>
      <BarClient />
      <form onSubmit={(e) => handleSubmit(e)}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            flexWrap: "false",
          }}
        >
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "nowrap",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "60vh",
              mt: 4,
            }}
          >
            <FormControl variant="filled" focused>
              <InputLabel htmlFor="name" required>
                Nome
              </InputLabel>
              <FilledInput
                id="name"
                sx={{ color: "white", width: "calc(450px + 2vmin)" }}
                defaultValue={response?.name}
                required
              />
            </FormControl>
            <FormControl variant="filled" focused sx={{ mt: 5 }}>
              <InputLabel htmlFor="email" required>
                E-mail
              </InputLabel>
              <FilledInput
                id="email"
                sx={{ color: "white", width: "calc(450px + 2vmin)" }}
                defaultValue={response?.email}
                required
              />
            </FormControl>
            <FormControl variant="filled" focused sx={{ mt: 5 }}>
              <InputLabel htmlFor="password">Senha</InputLabel>
              <FilledInput
                id="password"
                type="password"
                sx={{ color: "white", width: "calc(450px + 2vmin)" }}
                defaultValue=""
              />
            </FormControl>
            <Button
              variant="outlined"
              type="submit"
              sx={{ mt: 2, mb: 1, padding: "8px 25px" }}
            >
              Salvar
            </Button>
            <Button
              variant="outlined"
              color="warning"
              type="button"
              sx={{ marginTop: 2, padding: "8px 25px" }}
              onClick={() => handleDelete()}
            >
              Apagar
            </Button>
          </FormGroup>
        </Container>
      </form>
    </>
  );
}
