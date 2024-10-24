import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import { MainRoutes } from "../routes/MainRoutes";
import SignOutButton from "./AuthComponents/SignOutButtonComponent";

const drawerWidth = 240;

function ProtectedHeader(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        siNUsoid CMS
      </Typography>
      <Divider />
      <List>
        {MainRoutes.filter((route) => route?.nabarItem).map((item, idx) => (
          <ListItem key={`navbarItem-${idx}`} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Link to={item?.path}>
                <ListItemText primary={item?.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <SignOutButton />
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 999 }}>
      {/* <CssBaseline /> */}
      <AppBar style={{ backgroundColor: "#334155" }} component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}>
            <Link to="/">
              <img
                src="/images/pageLogo.png"
                alt="logo"
                style={{ width: "20vw", minWidth: "248px" }}
              />
            </Link>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {MainRoutes.filter((route) => route?.nabarItem).map((item, idx) => (
              <Link to={item?.path} key={item?.name}>
                <Button key={item?.name} sx={{ color: "#fff" }}>
                  {item?.name}
                </Button>
              </Link>
            ))}
          </Box>
          {/* Sign Out Button */}
          <Box sx={{ display: { xs: "none", sm: "block" }, mx: 2 }}>
            <SignOutButton />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default ProtectedHeader;
