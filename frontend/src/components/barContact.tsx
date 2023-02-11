import { IconButton, Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ContactDataContext } from "../contexts/ContactData.context";
import { UserListContext } from "../contexts/userList.context";

interface IBarContact {
  add?: boolean;
  edit?: boolean;
  home?: boolean;
}

export default function BarContact({ add, edit, home }: IBarContact) {
  const { getUsers } = useContext(UserListContext);
  const navigate = useNavigate();
  const { response, setId, id } = useContext(ContactDataContext);

  return (
    <div className="containerMenu">
      {response ? (
        <Typography
          gutterBottom
          variant="h4"
          textAlign={"start"}
          sx={{ display: "flex", alignItems: "center", margin: 0 }}
        >
          {response.name}
        </Typography>
      ) : (
        <Typography
          gutterBottom
          variant="h4"
          textAlign={"start"}
          sx={{ display: "flex", alignItems: "center", margin: 0 }}
        ></Typography>
      )}
      <div>
        {edit && (
          <IconButton
            sx={{
              color: "white",
              background: "rgb(4 194 236)",
              transition: "1000ms",

              ":hover": {
                background: "rgb(0 222 219)",
                transition: "1000ms",
              },
            }}
            onClick={() => {
              navigate(`edit`);
            }}
          >
            <EditIcon />
          </IconButton>
        )}
        {add && (
          <IconButton
            sx={{
              color: "white",
              background: "rgb(4 194 236)",
              transition: "1000ms",
              ml: 2,
              ":hover": {
                background: "rgb(0 222 219)",
                transition: "1000ms",
              },
            }}
            onClick={() => {
              navigate(`created`);
              setId(undefined);
            }}
          >
            <AddIcon />
          </IconButton>
        )}
        {!home ? (
          <IconButton
            sx={{
              color: "white",
              background: "grey",
              transition: "1000ms",
              ml: 2,

              ":hover": {
                background: "rgb(4 194 236)",
                transition: "1000ms",
              },
            }}
            onClick={() => {
              setId(undefined);
              navigate(-1);
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        ) : (
          <IconButton
            sx={{
              color: "white",
              background: "grey",
              transition: "1000ms",
              ml: 2,

              ":hover": {
                background: "rgb(4 194 236)",
                transition: "1000ms",
              },
            }}
            onClick={async () => {
              setId(undefined);
              await getUsers();
              navigate("/contacts");
            }}
          >
            <HomeIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
}
