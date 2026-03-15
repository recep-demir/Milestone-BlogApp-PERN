import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Button, Tooltip, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { useNavigate } from "react-router-dom";
import useAuthCalls from "../hooks/useAuthCalls";

const pages = [
  { name: "Dashboard", path: "/" },
  { name: "New Blog", path: "/new-blog" },
  { name: "About", path: "/about" }
];
const settings = [
  { name: "My Blogs", path: "/my-blogs" },
  { name: "Profile", path: "/profile" },
  { name: "Logout", path: "/logout" }
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate(); 
  const {logout} = useAuthCalls();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

// ŞİMŞEK HIZINDA YÖNLENDİRME 
  const handleNavigate = (path) => {
    handleCloseNavMenu();
    handleCloseUserMenu();
    
    if (path === "/") {
      navigate("/?page=1"); // Logoya/Dashboard'a tıklayınca ZORLA 1. sayfaya atar!
    } else {
      navigate(path);
    }
    
    window.scrollTo(0, 0); // Diğer sayfalara geçince en üste kaydırır
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "secondary.second" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RssFeedIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1, cursor:"pointer" }} onClick={() => handleNavigate("/")} />
          <Typography
            variant="h6"
            noWrap
            onClick={() => handleNavigate("/")}
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
             BLOG
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleNavigate(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button key={page.name} onClick={() => handleNavigate(page.path)} sx={{ my: 2, color: "white", display: "block" }}>
                {page.name}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <PersonIcon sx={{ color: "white", fontSize: "2rem" }} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              sx={{ mt: "45px"}}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={setting.name === "Logout" ? logout : () => handleNavigate(setting.path)} sx={{ width: "140px",height:"40px", justifyContent: "center" }} > 
                  <Typography textAlign="center" sx={{ fontSize: "1.1rem" }}>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;