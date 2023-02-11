import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { useContext } from "react";
import CardClient from "../components/cardClient";
import TabComponent from "../components/tab.component";
import { UserListContext } from "../contexts/userList.context";

export default function ListUsers() {
  const { dataContacts } = useContext(UserListContext);

  return (
    <>
      <TabComponent />
      <Container
        sx={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          mb: 5,
        }}
      >
        {dataContacts &&
          dataContacts.map((user) => (
            <CardClient key={user.id} id={user.id} name={user.name} />
          ))}
        {dataContacts.length === 0 && (
          <Container
            sx={{
              mt: 8,
            }}
          >
            <Typography variant="h4">Nenhum contato cadastrado...</Typography>
          </Container>
        )}
      </Container>
    </>
  );
}
