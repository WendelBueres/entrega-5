import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

interface IUserDataContextChildren {
  children: ReactNode;
}

interface IEmailContact {
  createdAt: string;
  email: string;
  id: number;
  updatedAt: string;
  userId: number;
}

interface IPhoneContact {
  createdAt: string;
  phone: string;
  id: number;
  updatedAt: string;
  userId: number;
}

interface IUserData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  ContactEmail: IEmailContact[];
  ContactPhone: IPhoneContact[];
}

interface IUserDataContext {
  response: IUserData | null;
  setResponse: Dispatch<SetStateAction<null | IUserData>>;
  setId: Dispatch<SetStateAction<undefined | string>>;
  id: undefined | string;
  getUser(): Promise<void>;
}

export const UserDataContext = createContext<IUserDataContext>(
  {} as IUserDataContext
);

export const UserDataProvider = ({ children }: IUserDataContextChildren) => {
  const [id, setId] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<IUserData | null>(null);

  async function getUser() {
    if (id) {
      const { data } = await toast.promise(api.get(`users/${id}`), {
        pending: "Carregando dados do cliente ⌚",
        success: "Requisição concluida 😎",
        error: "Ops, algo deu errado 🤦‍♂️",
      });
      setResponse(data);
    }
  }

  useEffect(() => {
    if (id === undefined) {
      setResponse(null);
    } else {
      getUser();
    }
  }, [id]);

  return (
    <UserDataContext.Provider
      value={{ getUser, response, setResponse, id, setId }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
