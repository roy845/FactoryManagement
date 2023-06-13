import React, { useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../context/auth";
import "../../styles/cursorStyles.css";
import "../../styles/errorStyles.css";
import "../../styles/successStyles.css";
import toast from "react-hot-toast";
import { login } from "../../serverAPI";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  let from = "/home";
  if (location.state && location.state.from && location.state.from.pathname) {
    from = location.state.from.pathname;
  }
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsValidEmail(validEmailRegex.test(inputEmail));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !username) {
      toast.error("Fill in all the details");
    }

    try {
      const { data } = await login(email, username);

      toast.success(data?.message);

      setAuth({
        ...auth,
        user: data.user,
        token: data.token,
      });

      const authData = {
        user: data.user,
        token: data.token,
      };

      localStorage.setItem("auth", JSON.stringify(authData));
      navigate(from, { replace: true });

      setEmail("");
      setUsername("");
    } catch (err) {
      console.log(err);
      if (!err || !err.response) {
        toast.error("No Server Response");
      } else if (err.response?.status === 400) {
        toast.error("Max actions reached please try again tomorrow");
      } else if (err?.response?.status === 404) {
        toast.error(err?.response?.data.error);
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />

          <Typography variant="caption">
            {email === "" ? null : !isValidEmail ? (
              <span className="error">
                <FontAwesomeIcon className="icon" icon={faTimes} />
                <span className="text">{"Invalid email address"}</span>
              </span>
            ) : (
              <span className="success">
                <FontAwesomeIcon className="icon" icon={faCheck} />
                <span className="text">{"Valid email address"}</span>
              </span>
            )}
          </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!isValidEmail || !username}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
