import {
  Button,
  FilledInput,
  FormControl,
  FormGroup,
  InputLabel,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Container,
} from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BarClient from "../components/barClient";
import { UserDataContext } from "../contexts/userDetails.context";
import api from "../services/api";

export default function CreateContact() {
  const navigate = useNavigate();
  const params = useParams();
  const { setId } = useContext(UserDataContext);

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    let email: boolean = e.target[0].checked;
    let phone: boolean = e.target[1].checked;
    let contact: string = e.target[2].value;
    let id = 0;
    if (params.id) {
      id = +params.id;
    }
    if (email) {
      let data = { userId: id, email: contact };
      await api
        .post(`email`, data)
        .then((response) => {
          toast.success("Contato cadastrado com sucesso!");
          setId(undefined);
          navigate(`/user/${id}`);
        })
        .catch((error) => {
          if (error.response.data.message === "provide a valid email") {
            toast.error("Digite um email com formato válido.");
          } else if (
            error.response.data.message === "email is already registered"
          ) {
            toast.error(
              "Esse email já se encontra cadastrado para algum cliente."
            );
          } else {
            toast.error("Ops, algo deu errado!");
          }
        });
    }
    if (phone) {
      await api
        .post(`phone`, { userId: id, phone: contact })
        .then((response) => {
          toast.success("Contato cadastrado com sucesso!");
          setId(undefined);
          navigate(`/user/${id}`);
        })
        .catch((error) => {
          if (
            error.response.data.message ===
            "provide a valid phone, in format (XX) XXXX-XXXX or (XX) XXXXX-XXXX"
          ) {
            toast.error("Digite um telefone com formato válido.");
          } else if (
            error.response.data.message === "phone is already registered"
          ) {
            toast.error(
              "Esse telefone já se encontra cadastrado para algum cliente."
            );
          } else {
            toast.error("Ops, algo deu errado!");
          }
        });
    }
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
          <Container>
            <FormControl
              sx={{ display: "flex", mb: 4 }}
              variant="filled"
              focused
            >
              <FormLabel id="label-type">Tipo</FormLabel>
              <RadioGroup
                aria-labelledby="label-type"
                defaultValue="email"
                name="radio-buttons-group"
              >
                <FormControlLabel
                  value="email"
                  control={<Radio />}
                  label="Email"
                />
                <FormControlLabel
                  value="phone"
                  control={<Radio />}
                  label="Telefone"
                />
              </RadioGroup>
            </FormControl>
          </Container>
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
