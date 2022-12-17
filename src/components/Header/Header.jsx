import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import useAuth from "../../hooks/useAuth";
import Lottie from "react-lottie-player";
import { useNavigate } from "react-router-dom";

function Header() {
  let navigate = useNavigate();
  const { user, googleLogout } = useAuth();
  const pages = ["Home", "Pricing", "Blog"];
  const settings = [
    { name: "Profile" },
    { name: "Logout", function: googleLogout },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // require("../../../public/starts-sky.gif");
  return (
    <AppBar
      position="static"
      style={{
        backgroundColor: "#2074d4",
        backgroundImage: `url(https://64.media.tumblr.com/07aeb9ee5daad67fa66f44706da50f9c/tumblr_npvj6c8Qhz1rgda2fo3_500.gifv)`,
        //backgroundImage: `url(https://media.tenor.com/xDH6oELEQs4AAAAd/stars-sky.gif)`,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Lottie
            loop
            animationData={require("../../Data/astro.json")}
            play
            style={{ width: 75, height: 75 }}
          />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem>
                <Typography
                  textAlign="center"
                  onClick={() => navigate("/main")}
                >
                  Home
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/main")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Home
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={
                    user.picture
                      ? user.picture
                      : "https://t4.ftcdn.net/jpg/00/97/00/09/240_F_97000908_wwH2goIihwrMoeV9QF3BW6HtpsVFaNVM.jpg"
                  }
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => (
                <MenuItem key={index} onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={setting.name == "Logout" ? googleLogout : null}
                    textAlign="center"
                  >
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
