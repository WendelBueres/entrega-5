import { Tab } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import { useContext } from "react";
import { TabContext } from "../contexts/tab.context";

export default function TabComponent() {
  const { valueTab, setValueTab } = useContext(TabContext);

  function handleChangeTabs(event: React.SyntheticEvent, newValue: number) {
    setValueTab(newValue);
  }

  return (
    <>
      <h1>KContacts</h1>
      <Tabs
        onChange={handleChangeTabs}
        value={valueTab}
        textColor="inherit"
        centered
      >
        <Tab label="Registrar Cliente" />
        <Tab label="Clientes" />
      </Tabs>
    </>
  );
}
