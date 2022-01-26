import React, { useEffect, useState } from "react";
import {
  Box,
  Fab,
  Typography,
  Breadcrumbs,
  Link,
  Grid,
  useMediaQuery,
  Alert,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CourseCard from "../../components/CourseCard";
import { useTeacherCourseData } from "./Course.hook";
import AddEditCard from "./AddEditCard";
import axios from "axios";
import NavSidebar from "../../components/navSideBar/NavSide";
import { useNavigate } from "react-router";

export default function TeacherCourse() {
  document.title = "Teacher - Courses";

  const mobileVersion = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const [refresh, setRefresh] = useState(1);
  const [errorAlert, setErrorAlert] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const { courseData: data, errorResponse } = useTeacherCourseData(refresh);

  const closeAlert = () => {
    setErrorAlert(false);
  };

  const openEdit = (course) => {
    setEditData(course);
    setEditOpen(true);
  };

  const onDelete = (courseId) => {
    // console.log(id);
    setRefresh(refresh + 1);
    axios
      .delete(`http://13.59.7.136:8080/api/v1/courses/${courseId}`)
      .then((resp) => {
        console.log(resp);
        setRefresh(refresh + 1);
        if (resp.data.meta.status !== 200) {
          console.log(resp);
        } else {
          console.log(resp);
        }
      })
      .catch((e) => {
        console.error(e);
        setRefresh(refresh + 1);
        if (e.response) {
          console.log(e.response);
        } else if (e.request) {
          console.log(e.request);
        }
      });
  };

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user != "Teacher") {
      navigate("/teacher/login")
    }
  }, []);


  useEffect(() => {
    setErrorAlert(true);
  }, [errorResponse]);
  return (
    <Box
      sx={{
        bgcolor: "secondary.200",
      }}
    >
      <Box>
        <NavSidebar>
          <Box
            sx={{
              margin: "30px",
              minHeight: "100vh",
            }}
          >
            <Typography variant="h3" component="h2" ml={2}>
              MyCourse
              <Fab
                variant="extended"
                onClick={() => setCreateOpen(true)}
                sx={{
                  ml: "15px",
                  mb: "10px",
                  bgcolor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "primary.main",
                  },
                }}
              >
                <AddIcon sx={{ mr: 1 }} />
                {mobileVersion && "CREATE"}
              </Fab>
            </Typography>
            <hr
              sx={{
                color: "primary.main",
              }}
            />
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                ml: "17px",
              }}
            >
              <Link underline="hover" color="inherit" href="/">
                Home
              </Link>
              <Typography color="text.primary">MyCourse</Typography>
            </Breadcrumbs>
            <br />
            {/* {errorResponse && (
              <Typography textAlign="center" color="red">
                {errorResponse}
              </Typography>
            )} */}
            {/* <Grid container spacing={0} justifyContent={"space-around"}> */}
            <Grid
              container
              spacing={3}
              justifyContent="flex-start"
              flexDirection="row"
            >
              {data?.map((course, key) => (
                <Grid item lg={4} md={6} xs={12}>
                  <CourseCard
                    role="Teacher"
                    course={course}
                    openEdit={openEdit}
                    onDelete={onDelete}
                  />
                </Grid>
              ))}
            </Grid>
            {/* </Grid> */}
          </Box>
        </NavSidebar>
        {errorResponse && (
          <Snackbar
            open={errorAlert}
            autoHideDuration={6000}
            onClose={closeAlert}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={closeAlert}
              severity="error"
              sx={{ width: "100%", bgcolor: "red", color: "white" }}
            >
              {errorResponse}
            </Alert>
          </Snackbar>
        )}
        <AddEditCard
          setOpen={setCreateOpen}
          createOpen={createOpen}
          title="Create"
          setRefresh={setRefresh}
          refresh={refresh}
        />
        <AddEditCard
          setOpen={setEditOpen}
          editOpen={editOpen}
          title="Edit"
          setRefresh={setRefresh}
          refresh={refresh}
          editData={editData}
        />
      </Box>
    </Box>
  );
}
