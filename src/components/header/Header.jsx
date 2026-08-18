import React, { useContext, useState } from "react";

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";

import AccountCircle from "@mui/icons-material/AccountCircle";

import { Usercontext } from "../../context/Dataprovide";
import { Link } from "react-router-dom";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { user } = useContext(Usercontext);

  const auth = user;

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          {/* Blog Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{ mr: 4 }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Blog
            </Link>
          </Typography>

          {/* Home About Contact */}
          <Box
            sx={{
              display: "flex",
              gap: 3,
            }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Home
            </Link>

            <Link
              to="/about"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              About
            </Link>

            <Link
              to="/contact"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              Contact
            </Link>
          </Box>

          {/* Push Login/User to Right */}
          <Box sx={{ marginLeft: "auto" }}>

            {auth ? (
              <>
                {/* User Account Icon */}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/profile"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      Profile
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/myaccount"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      My Account
                    </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              /* Login Button */
              <Button
                component={Link}
                to="/login"
                variant="contained"
                color="inherit"
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  "&:hover": {
                    backgroundColor: "#eeeeee",
                  },
                }}
              >
                Login
              </Button>
            )}

          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;