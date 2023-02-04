import {
  Button,
  FilledInput,
  FormControl,
  FormGroup,
  InputLabel,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BarClient from "../components/barClient";
import { UserDataContext } from "../contexts/userDetails.context";
import { UserListContext } from "../contexts/userList.context";
import api from "../services/api";

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { response, setId } = useContext(UserDataContext);
  const { getUsers } = useContext(UserListContext);

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    let name: string = e.target[0].value;
    await api
      .patch(`users/${id}`, { name: name })
      .then((response) => {
        toast.success("Cadastro editado com sucesso!");
        setId(undefined);
        navigate(`/user/${id}`);
      })
      .catch((error) => {
        toast.error("Ops, algo deu errado!");
      });
  }

  async function handleDelete() {
    await api
      .delete(`users/${id}`)
      .then(async (response) => {
        toast.success("Cadastro apagado com sucesso!");
        setId(undefined);
        await getUsers();
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
              defaultValue={response?.name}
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
          <Button
            variant="outlined"
            color="warning"
            type="button"
            sx={{ marginTop: 5, padding: "8px 25px" }}
            onClick={() => handleDelete()}
          >
            Apagar
          </Button>
        </FormGroup>
      </form>
    </>
  );
}
