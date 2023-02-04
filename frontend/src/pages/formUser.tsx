import {
  Button,
  FilledInput,
  FormControl,
  FormGroup,
  InputLabel,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import TabComponent from "../components/tab.component";
import api from "../services/api";

export default function FormUser() {
  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    let name: string = e.target[0].value;
    await api
      .post("users", { name: name })
      .then((response) => {
        e.target[0].value = "";
        toast.success("Cadastro criado com sucesso!");
      })
      .catch((error) => {
        toast.error("Ops, algo deu errado!");
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
