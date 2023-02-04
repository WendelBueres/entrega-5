import { Container } from "@mui/system";
import { useContext } from "react";
import CardClient from "../components/cardClient";
import TabComponent from "../components/tab.component";
import { UserListContext } from "../contexts/userList.context";

export default function ListUsers() {
  const { response } = useContext(UserListContext);

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
        {response &&
          response.map((user) => (
            <CardClient key={user.id} id={user.id} name={user.name} />
          ))}
      </Container>
    </>
  );
}
