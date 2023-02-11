import {
  Button,
  FilledInput,
  FormControl,
  FormGroup,
  InputLabel,
  Container,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BarClient from "../components/barContact";
import api from "../services/api";

export default function RegisterUser() {
  const navigate = useNavigate();

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
      .post(`users/`, data)
      .then((response) => {
        toast.success("Registro efetuado com sucesso!");
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
                required
              />
            </FormControl>
            <FormControl variant="filled" focused sx={{ mt: 5 }}>
              <InputLabel htmlFor="password" required>
                Senha
              </InputLabel>
              <FilledInput
                id="password"
                type="password"
                sx={{ color: "white", width: "calc(450px + 2vmin)" }}
                required
              />
            </FormControl>
            <Button
              variant="outlined"
              type="submit"
              sx={{ mt: 2, mb: 1, padding: "8px 25px" }}
            >
              Salvar
            </Button>
          </FormGroup>
        </Container>
      </form>
    </>
  );
}
