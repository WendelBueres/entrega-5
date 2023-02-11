import ContactPageIcon from "@mui/icons-material/ContactPage";
import {
  Card,
  CardActionArea,
  CardContent,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ICardClient {
  id: number;
  name: string;
}

export default function CardClient({ id, name }: ICardClient) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        padding: "4px",
        height: "35vh",
        display: "flex",
        alignItems: "center",
        mt: 2,
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          width: "calc(270px + 2vmin)",
          padding: "5px",
          maxWidth: "45vw",
          alignItems: "center",
        }}
        onClick={() => navigate(`/contact/${id}/`)}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "space-around",
          }}
        >
          <SvgIcon display={"flex"}>
            <ContactPageIcon color="primary"></ContactPageIcon>
          </SvgIcon>
          <div className="containerInfo-user">
            <Typography gutterBottom variant="body2" textAlign={"start"}>
              Cliente
            </Typography>
            <Typography gutterBottom variant="body2" textAlign={"start"}>
              ID: {id}
            </Typography>
          </div>
          <Typography
            sx={{
              fontSize: "18px",
              flexWrap: "wrap",
              textDecoration: "underline",
              fontWeight: 500,
            }}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
