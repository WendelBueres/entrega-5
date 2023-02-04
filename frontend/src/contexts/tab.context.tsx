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
  const [valueTab, setValueTab] = useState(1);
  const navigate = useNavigate();

  const isHome = useMatch("/");
  const isRegisterClient = useMatch("/register-client");

  useEffect(() => {
    if (valueTab === 1) {
      navigate("/");
    }

    if (valueTab === 0) {
      navigate("/register-client");
    }
  }, [valueTab]);

  useEffect(() => {
    if (isHome) {
      setValueTab(1);
    }

    if (isRegisterClient) {
      setValueTab(0);
    }
  }, []);

  return (
    <TabContext.Provider value={{ valueTab, setValueTab }}>
      {children}
    </TabContext.Provider>
  );
};
