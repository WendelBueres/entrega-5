import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import api from "../services/api";

interface IContactDataContextChildren {
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

interface IContactData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  ContactEmail: IEmailContact[];
  ContactPhone: IPhoneContact[];
}

interface IContactDataContext {
  response: IContactData | null;
  setResponse: Dispatch<SetStateAction<null | IContactData>>;
  setId: Dispatch<SetStateAction<undefined | string>>;
  id: undefined | string;
  getContact(): Promise<void>;
}

export const ContactDataContext = createContext<IContactDataContext>(
  {} as IContactDataContext
);

export const ContactDataProvider = ({
  children,
}: IContactDataContextChildren) => {
  const [id, setId] = useState<string | undefined>(undefined);
  const [response, setResponse] = useState<IContactData | null>(null);

  async function getContact() {
    if (id) {
      const { data } = await api.get(`contact/${id}`);
      setResponse(data);
    }
  }

  useEffect(() => {
    if (id === undefined || id === null) {
      setResponse(null);
    } else {
      getContact();
    }
  }, [id]);

  return (
    <ContactDataContext.Provider
      value={{ getContact, response, setResponse, id, setId }}
    >
      {children}
    </ContactDataContext.Provider>
  );
};
