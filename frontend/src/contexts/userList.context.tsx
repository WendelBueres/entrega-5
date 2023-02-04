import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
  useContext,
} from "react";
import { toast } from "react-toastify";
import api from "../services/api";
import { TabContext } from "./tab.context";

interface IUserListContextChildren {
  children: ReactNode;
}

interface IUserList {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface IUserListContext {
  response: IUserList[];
  setResponse: Dispatch<SetStateAction<never[]>>;
  getUsers(): Promise<void>;
}

export const UserListContext = createContext<IUserListContext>(
  {} as IUserListContext
);

export const UserListProvider = ({ children }: IUserListContextChildren) => {
  const [response, setResponse] = useState([]);
  const { valueTab } = useContext(TabContext);

  async function getUsers() {
    if (valueTab === 1) {
      const { data } = await toast.promise(api.get("users/"), {
        pending: "Carregando lista de clientes ⌚",
        success: "Lista de clientes carregada 😎",
        error: "Ops, algo deu errado 🤦‍♂️",
      });
      setResponse(data);
    }
  }

  useEffect(() => {
    setResponse([]);
    getUsers();
  }, [valueTab]);

  return (
    <UserListContext.Provider value={{ getUsers, response, setResponse }}>
      {children}
    </UserListContext.Provider>
  );
};
