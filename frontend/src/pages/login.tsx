import { Container } from "@mui/system";
import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e: React.BaseSyntheticEvent) {
    e.preventDefault();
    const { value: email } = e.target[0];
    const { value: password } = e.target[1];

    await signIn({ email: email, password: password });
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <form onSubmit={async (e) => await handleSubmit(e)}>
          <FormControl
            sx={{
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              backgroundColor: "rgba(163, 164, 210, 0.1)",
            }}
          >
            <Typography gutterBottom mb={4} variant="h4" textAlign={"start"}>
              KContacts
            </Typography>
            <TextField
              id="email"
              variant="filled"
              color="primary"
              label="E-mail"
              sx={{
                background: "white",
                width: "calc(400px + 2vmin)",
                borderRadius: "5px",
              }}
              required
            />
            <TextField
              id="password"
              label="Senha"
              variant="filled"
              type="password"
              sx={{
                background: "white",
                width: "calc(400px + 2vmin)",
                borderRadius: "5px",
              }}
              required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ width: 200, height: 50, mt: 5 }}
            >
              Login
            </Button>
            <Button
              onClick={() => navigate("/register-user")}
              variant="contained"
              sx={{ width: 200, height: 50, mt: 2.5 }}
            >
              Registro
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
}
