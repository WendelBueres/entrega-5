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

interface IResponse {
  id: number;
  name: string;
  email: string;
}

interface IUserListContext {
  response: IResponse | undefined;
  setResponse: Dispatch<SetStateAction<undefined>>;
  id: undefined | number;
  dataContacts: IUserList[] | never[];
  getUsers(): Promise<void>;
}

export const UserListContext = createContext<IUserListContext>(
  {} as IUserListContext
);

export const UserListProvider = ({ children }: IUserListContextChildren) => {
  const [response, setResponse] = useState();
  const [id, setId] = useState();
  const [dataContacts, setDataContacts] = useState([]);
  const { valueTab } = useContext(TabContext);

  async function getUsers() {
    if (valueTab === 1) {
      const { data } = await toast.promise(api.get("users/"), {
        pending: "Carregando lista de contatos ⌚",
        success: "Lista de contatos carregada 😎",
        error: "Ops, algo deu errado 🤦‍♂️",
      });
      setResponse(data);
      setDataContacts(data.contacts);
      setId(data.id);
    }
  }

  useEffect(() => {
    setResponse(undefined);
    getUsers();
  }, [valueTab]);

  return (
    <UserListContext.Provider
      value={{ getUsers, response, setResponse, dataContacts, id }}
    >
      {children}
    </UserListContext.Provider>
  );
};
