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

export default function EditContact() {
  const { response, setResponse, setId } = useContext(ContactDataContext);
  const { getUsers } = useContext(UserListContext);
  const navigate = useNavigate();
  const { id } = useParams();

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    let name: string = e.target[0].value;

    await api
      .patch(`contact/${id}`, { name: name })
      .then((response) => {
        toast.success("Cadastro editado com sucesso!");
        setResponse(response.data);
        navigate(`/contact/${id}`);
      })
      .catch((error) => {
        toast.error("Ops, algo deu errado!");
      });
  }

  async function handleDelete() {
    await api
      .delete(`contact/${id}`)
      .then(async (response) => {
        toast.success("Contato apagado com sucesso!");
        setId(undefined);
        getUsers();
        navigate(`/contacts`);
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
