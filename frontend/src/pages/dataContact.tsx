import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactDataContext } from "../contexts/ContactData.context";
import BarClient from "../components/barContact";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import api from "../services/api";
import { toast } from "react-toastify";

export default function DataContact() {
  const { response, setId } = useContext(ContactDataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  setId(id);

  async function handleDeleteEmail(idEmail: number) {
    await api
      .delete(`email/${idEmail}`)
      .then(async (response) => {
        toast.success("Contato apagado com sucesso!");
        setId(undefined);
      })
      .catch((error) => {
        toast.error("Ops, algo deu errado!");
      });
  }

  async function handleDeletePhone(idPhone: number) {
    await api
      .delete(`phone/${idPhone}`)
      .then(async (response) => {
        toast.success("Contato apagado com sucesso!");
        setId(undefined);
      })
      .catch((error) => {
        toast.error("Ops, algo deu errado!");
      });
  }

  return (
    <>
      <BarClient add={true} edit={true} home={true} />
      <Container sx={{ width: "90%", padding: 0, margin: 0 }}>
        <Typography
          variant="h5"
          sx={{
            mt: 4,
            textDecoration: "underline",
            textAlign: "start",
          }}
        >
          Email
        </Typography>
        <List sx={{ mt: 2 }}>
          {response?.ContactEmail?.length ? (
            response?.ContactEmail?.map((contact) => {
              return (
                <ListItem
                  sx={{ padding: "14px 0px 12px 0px" }}
                  secondaryAction={
                    <>
                      <IconButton
                        sx={{ ":hover": { backgroundColor: "transparent" } }}
                        edge="end"
                        onClick={() =>
                          navigate(`/contact/email/${contact.id}/edit`)
                        }
                      >
                        <EditIcon
                          sx={{
                            color: "white",
                            mr: 2,
                            ":hover": {
                              color: "rgb(4 194 236)",
                            },
                          }}
                        />
                      </IconButton>
                      <IconButton
                        sx={{ ":hover": { backgroundColor: "transparent" } }}
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteEmail(contact.id)}
                      >
                        <DeleteIcon
                          sx={{
                            color: "white",
                            ":hover": {
                              color: "darkRed",
                            },
                          }}
                        />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <EmailIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={contact.email} />
                </ListItem>
              );
            })
          ) : (
            <h4>Sem emails cadastrados.</h4>
          )}
        </List>
      </Container>
      <Container sx={{ width: "90%", padding: 0, margin: 0 }}>
        <Typography
          variant="h5"
          sx={{
            mt: 4,
            textDecoration: "underline",
            textAlign: "start",
          }}
        >
          Telefone
        </Typography>
        <List sx={{ mt: 2 }}>
          {response?.ContactPhone?.length ? (
            response?.ContactPhone?.map((contact) => {
              return (
                <ListItem
                  sx={{ padding: "14px 0px 12px 0px" }}
                  secondaryAction={
                    <>
                      <IconButton
                        sx={{ ":hover": { backgroundColor: "transparent" } }}
                        edge="end"
                        onClick={() =>
                          navigate(`/contact/phone/${contact.id}/edit`)
                        }
                      >
                        <EditIcon
                          sx={{
                            color: "white",
                            mr: 2,
                            ":hover": {
                              color: "rgb(4 194 236)",
                            },
                          }}
                        />
                      </IconButton>
                      <IconButton
                        sx={{ ":hover": { backgroundColor: "transparent" } }}
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeletePhone(contact.id)}
                      >
                        <DeleteIcon
                          sx={{
                            color: "white",
                            ":hover": {
                              color: "darkRed",
                            },
                          }}
                        />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <PhoneIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={contact.phone} />
                </ListItem>
              );
            })
          ) : (
            <h4>Sem telefones cadastrados.</h4>
          )}
        </List>
      </Container>
    </>
  );
}
