import React from "react";
import { Tab } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import Tabs from "@mui/material/Tabs";
import Tooltip from "@mui/material/Tooltip";
import { useContext } from "react";
import { TabContext } from "../contexts/tab.context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { UserListContext } from "../contexts/userList.context";

export default function TabComponent() {
  const { valueTab, setValueTab } = useContext(TabContext);
  const { response } = useContext(UserListContext);
  const userName = response?.name;
  const firstLetter = userName?.slice(0, 1);

  function handleChangeTabs(event: React.SyntheticEvent, newValue: number) {
    setValueTab(newValue);
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.clear();
    handleClose();
    navigate("/");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <h1>KContacts</h1>
        <Tooltip title="Opções da conta">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>{firstLetter}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: "-1%",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Container
            sx={{ mt: 1, mb: 1.5, cursor: "default", userSelect: "none" }}
          >
            <Typography sx={{ color: "darkblue", textAlign: "center" }}>
              {userName}
            </Typography>
          </Container>
          <Divider />
          <MenuItem onClick={() => navigate("/user/edit")}>
            <Avatar /> Minha Conta
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleLogout()}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
        </Menu>
      </Container>
      <Tabs
        onChange={handleChangeTabs}
        value={valueTab}
        textColor="inherit"
        centered
      >
        <Tab label="Registrar Contato" />
        <Tab label="Contato" />
      </Tabs>
    </>
  );
}
