import {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import decode from "jwt-decode";
import { toast } from "react-toastify";
import api from "../services/api";
import { env } from "process";

interface IAuthChildren {
  children: ReactNode;
}

interface ISignIn {
  email?: string;
  password?: string;
}

interface IUser {
  userName: string;
}

interface IAuthContext {
  user: null | IUser;
  signIn: (data: ISignIn) => Promise<void>;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}

interface IResponse {
  name: string;
  email: string;
}

export interface IResponseLogin {
  token: string;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function AuthProvider({ children }: IAuthChildren) {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();
  const [login, setLogin] = useState<IResponse | undefined>();

  async function ProtectedRouters() {
    const token = localStorage.getItem("@kcontacts:token");

    if (token) {
      try {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const { data } = await api.get("/users");

        setLogin(data);
      } catch (err) {
        navigate("/");
      }
    } else if (token === null || token === undefined) {
      navigate("/");
    } else {
      navigate("/");
    }
  }

  useEffect(() => {
    ProtectedRouters();
  }, []);

  async function signIn(data: ISignIn) {
    try {
      const response = await api.post<IResponseLogin>("/login", data);

      if (response.status === 200) {
        const { token } = response.data;
        const dataToken: IUser = decode(token);
        console.log(dataToken);

        localStorage.setItem("@kcontacts:token", token);
        localStorage.setItem("@kcontacts:userName", dataToken.userName);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser({ userName: dataToken.userName });
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      toast.error("Usuário ou senha incorreto.");
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
