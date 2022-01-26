import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { yellow, indigo } from "@mui/material/colors/";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import secureLogin from "../assets/images/secureLogin.svg";
import logoInEdu from "../assets/images/logoInEdu.svg";
import RegistForm from "../components/RegistForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Navigate } from "react-router";

const classes = {
  registPage: {
    // height: 'auto',
    backgroundColor: yellow[200],
    padding: "5% 10%",
    // minWidth: '300px'
    minHeight: "80vh",
  },
  registContent: {
    backgroundColor: yellow[300],
    // height: '100%',
    padding: "7% 2%",
  },
  registText: {
    fontWeight: 600,
    justifyContent: "center",
    color: indigo[500],
  },
};

export default function RegisterTeacher() {
  const [error, setError] = useState([]);

  const [successOpen, setSuccessOpen] = useState(false);

  const handleSubmit = (e, data) => {
    e.preventDefault();
    axios
      .post("http://13.59.7.136:8080/api/v1/teachers/register", data)
      .then((resp) => {
        console.log(resp);
        if (resp.data.meta.status !== 200) {
          setError("try using different account");
        } else {
          setSuccessOpen(true);
        }
      })
      .catch((e) => {
        console.error(e);
        if (e.response) {
          console.log(e.response);
        } else if (e.request) {
          console.log(e.request);
        }
      });
  };

  if (successOpen) {
    return <Navigate to="/teacher/login" />;
  }

  return (
    <>
      <Box sx={classes.registPage}>
        <Paper elevation={0} sx={classes.registContent}>
          <Grid container spacing={2}>
            <Grid
              item
              container
              xs={12}
              lg={6}
              direction="column"
              spacing={2}
              sx={{
                textAlign: "center",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={2}>
                <img src={logoInEdu} alt="LogoInEdu" />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h3" sx={classes.registText}>
                  Register Your
                  <br />
                  Teacher Account
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <img
                  src={secureLogin}
                  style={{ width: "80%" }}
                  alt="icon secure"
                />
              </Grid>
            </Grid>
            <RegistForm
              error={error}
              handleSubmit={handleSubmit}
              loginLink="/teacher/login"
            />
          </Grid>
        </Paper>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={successOpen}
        onClose={() => {
          setSuccessOpen(false);
        }}
      >
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setSuccessOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity="success"
          sx={{ mb: 2 }}
        >
          Account Has Been Created
        </Alert>
      </Snackbar>
    </>
  );
}
