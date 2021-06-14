import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Card,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { UserContext } from "./context/UserContext";

const AdminLogin = () => {
  let history = useHistory();
  const { loginValue } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = loginValue;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: "https://rotarcthitk-voting-application.herokuapp.com/admin/login",
        method: "post",
        withCredentials: true,
        data: {
          email,
          password,
        },
      });
      if (response.status === 201) {
        setIsLoggedIn(true);
        history.push("/admin-page/participants");
      }
    } catch (e) {
      setOpen(true);
    }
  };
  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <h1>h1</h1> */}
      <Card>
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography>Hi Admin! Enter your details to enter</Typography>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Verify Credentials"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
};

export default AdminLogin;
