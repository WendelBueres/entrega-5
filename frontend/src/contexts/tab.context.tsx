import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { useMatch, useNavigate } from "react-router-dom";

interface ITabContextChildren {
  children: ReactNode;
}

interface ITabContext {
  valueTab: number;
  setValueTab: Dispatch<SetStateAction<number>>;
}

export const TabContext = createContext<ITabContext>({} as ITabContext);

export const TabProvider = ({ children }: ITabContextChildren) => {
  const token = localStorage.getItem("@kcontacts:token");
  const [valueTab, setValueTab] = useState(-1);
  const navigate = useNavigate();

  const isHome = useMatch("/contacts");
  const isRegisterClient = useMatch("/register-contact");

  useEffect(() => {
    if (valueTab === 1) {
      navigate("/contacts");
    }

    if (valueTab === 0) {
      navigate("/register-contact");
    }
  }, [valueTab]);

  useEffect(() => {
    if (isHome && token) {
      setValueTab(1);
    }

    if (isRegisterClient && token) {
      setValueTab(0);
    }
  }, [window.location.href]);

  return (
    <TabContext.Provider value={{ valueTab, setValueTab }}>
      {children}
    </TabContext.Provider>
  );
};
