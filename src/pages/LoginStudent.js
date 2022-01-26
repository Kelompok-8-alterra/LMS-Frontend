import Box from "@mui/material/Box";
import { indigo, yellow } from "@mui/material/colors";
import logoInEdu from "../assets/images/logoInEdu.png";
import login from "../assets/images/login.png";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LoginForm from "../components/LoginForm";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router";
import { Link } from "@mui/material";

const classes = {
  loginPage: {
    minHeight: "100vh",
    height: "100%",
    margin: "0 auto",
    backgroundColor: yellow[200],
    padding: "35px 7vw",
  },
  loginSection: {
    width: "100%",
    height: "auto",
    backgroundColor: yellow[300],
    textAlign: "center",
    paddingTop: "50px",
    paddingBottom: "20px",
  },
  loginText: {
    color: indigo[500],
    marginTop: "40px",
    marginBottom: "70px",
    fontWeight: 600,
  },
};

export default function LoginStudent() {
  const [error, setError] = useState([]);

  const [sucessLogin, setSucessLogin] = useState(false);

  const handleSubmit = (e, data) => {
    e.preventDefault();
    axios
      .post("http://13.59.7.136:8080/api/v1/students/login", data)
      .then((resp) => {
        console.log(resp);
        if (resp.data.meta.status !== 200) {
          setError(["Email atau Password salah, mohon check kembali"]);
        } else {
          setError([]);
          localStorage.setItem("token", resp.data.data.token);
          localStorage.setItem("user", "Student");
          setSucessLogin(true);
        }
      })
      .catch((e) => {
        console.error(e);
        if (e.response) {
          setError(["Email atau Password salah, mohon check kembali"]);
        } else if (e.request) {
          //server didn't catched
          setError(["Server Down, coba lagi nanti"]);
        }
      });
  };

  if (sucessLogin) {
    return <Navigate to="/home" />;
  }

  return (
    <Box sx={classes.loginPage}>
      <Grid
        container
        spacing={6}
        justifyContent="center"
        direction="row-reverse"
      >
        <Grid
          item
          container
          xs={12}
          md={6}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <img
              alt="login"
              src={login}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sx={{ width: "80%" }}>
            <Paper sx={classes.loginSection} elevation={0}>
              <img alt="logo" src={logoInEdu} />
              <Typography sx={classes.loginText} variant="h4">
                Login Student
              </Typography>
              <LoginForm
                handleSubmit={handleSubmit}
                error={error}
                registerLink="/student/register"
              />
              <Link href="/teacher/login" sx={{ textAlign: "right" }}>
                <Typography variant="body2" textAlign="center">
                  Are you a teacher?
                </Typography>
              </Link>
              <Typography variant="body2" color="textSecondary">
                Copyright ©InEdu 2021
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
