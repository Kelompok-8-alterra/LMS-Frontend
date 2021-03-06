import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React from "react";

export default function TypeStatusMolecules(props) {
  return (
    <Grid container mt="10px">
      <Grid container item spacing={1} xs={6} alignContent="end">
        <Grid item>
          <Box
            sx={{
              p: "2px",
              px: "20px",
              bgcolor: "primary.400",
              borderRadius: "7px",
            }}
          >
            <Typography variant="body1" color="white">
              {props.type}
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box
            sx={{
              p: "2px",
              px: "20px",
              bgcolor: "#F0F0F0",
              borderRadius: "7px",
            }}
          >
            <Typography variant="body1">{props.status} </Typography>
          </Box>
        </Grid>
      </Grid>
      {props.teacher && props.status === "Pending" && (
        <Grid
          container
          item
          spacing={1}
          xs={6}
          justifyContent="flex-end"
          alignContent="center"
        >
          <Grid item>
            <Button
              variant="contained"
              color="error"
              onClick={() => props.updateReq("Rejected")}
            >
              Reject
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="success"
              onClick={() => props.updateReq("Accepted")}
            >
              Accept
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
