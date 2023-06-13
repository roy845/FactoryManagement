import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import HomeIcon from "@mui/icons-material/Home";
import ClassIcon from "@mui/icons-material/Class";
import BadgeIcon from "@mui/icons-material/Badge";
import PersonIcon from "@mui/icons-material/Person";
const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(
    localStorage.getItem("drawerOpen") === "true" || false
  );
  const { auth, setAuth } = useAuth();
  const [selectedItem, setSelectedItem] = React.useState(
    +localStorage.getItem("selectedItem") || 0
  );

  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
    localStorage.setItem("drawerOpen", "true");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    localStorage.setItem("drawerOpen", "false");
  };
  console.log(selectedItem);

  const menuItems = [
    {
      name: "Home",
      icon: <HomeIcon />,
      onClick: (index) => {
        navigate("/home");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Departments",
      icon: <ClassIcon />,
      onClick: (index) => {
        navigate("/departments");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Shifts",
      icon: <BadgeIcon />,
      onClick: (index) => {
        navigate("/shifts");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Users",
      icon: <PersonIcon />,
      onClick: (index) => {
        navigate("/users");
        setSelectedItem(index);
        localStorage.setItem("selectedItem", index);
      },
    },
    {
      name: "Logout",
      icon: <LogoutIcon />,
      onClick: (index) => {
        setAuth(null);
        localStorage.removeItem("auth");
        localStorage.removeItem("selectedItem");
        localStorage.removeItem("logs");
        localStorage.removeItem("drawerOpen");

        navigate("/");
        toast.success("Logout Successfully");
        setSelectedItem(index);
        document.title = "Factory Management";
      },
    },
  ];

  React.useEffect(() => {
    setSelectedItem(+localStorage.getItem("selectedItem"));
    localStorage.removeItem("selectedItem");
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{ backgroundColor: "purple", color: "white" }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "flex-start" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Factory Management
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{
              textAlign: "right",
              marginLeft: "auto",
            }}
          >
            {`Hello, ${auth?.user?.FullName}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              style={{
                backgroundColor: selectedItem === index ? "purple" : "",
                color: selectedItem === index ? "white" : "",
              }}
            >
              <ListItemButton onClick={() => item.onClick(index)}>
                <ListItemIcon
                  style={{
                    color: selectedItem === index ? "white" : "",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
