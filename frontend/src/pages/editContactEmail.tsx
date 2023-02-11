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
import BarClient from "../components/barContact";
import { ContactDataContext } from "../contexts/ContactData.context";
import api from "../services/api";

export default function EditContactEmail() {
  const navigate = useNavigate();
  const params = useParams();
  const { setId } = useContext(ContactDataContext);

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    let contact: string = e.target[0].value;
    let id = 0;
    if (params.id) {
      id = +params.id;
    }
    await api
      .patch(`email/${id}`, { email: contact })
      .then((response) => {
        toast.success("Contato cadastrado com sucesso!");
        setId(undefined);
        navigate(-1);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        if (error.response.data.message === "provide a valid email") {
          toast.error("Digite um email com formato válido.");
        } else if (
          error.response.data.message === "Email is already registered"
        ) {
          toast.error(
            "Esse email já se encontra cadastrado para algum cliente."
          );
        } else {
          toast.error("Ops, algo deu errado!");
        }
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
            <InputLabel htmlFor="contact" required>
              Contato
            </InputLabel>
            <FilledInput
              id="contact"
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
