import ReadingDescription from "../components/ReadingDescription";
import Title from "../components/Title";
import Discussion from "../components/Discussion";
import ReactLoading from "react-loading";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import useFetch from "../customHooks/useFetch";
import { indigo, yellow } from "@mui/material/colors";
import { useState, useEffect } from "react";

import { useReadData } from "../components/SideBar.Hook";

const StudentReading = () => {
  const { readData: dataRead, errorResponse } = useReadData();
  const [filterReview, setFilterReview] = useState(0);
  const [threads, setThreads] = useState(null);
  const [reviewItems, setReviewItems] = useState(3);

  const { data: threadsData, isPending: threadsPending } = useFetch(
    "http://localhost:8000/threads"
  );

  useEffect(() => {
    if (threadsData) {
      setThreads(threadsData);
    }
  }, [threadsData]);

  useEffect(() => {
    let filtered = threadsData?.filter((threads) => threads);
    setThreads(filtered);
    setReviewItems(3);
  }, [filterReview]);
  console.log(dataRead);
  console.log("title woii ::", dataRead?.title);

  return (
    <Box
      sx={{
        backgroundColor: yellow[200],
        padding: "70px 0",
        minHeight: "50vh",
      }}
    >
      {threadsPending ? (
        <Grid container spacing={0} justifyContent="center">
          <ReactLoading
            type="balls"
            color={indigo[500]}
            height="auto"
            width="17%"
          />
        </Grid>
      ) : (
        <>
          <Container>
            <Grid container spacing={5} justifyContent="center">
              <Title reading={dataRead?.title} />
              <ReadingDescription description={dataRead?.content} />
              <Discussion
                threads={threads}
                reviewItems={reviewItems}
                setReviewItems={setReviewItems}
              />
            </Grid>
          </Container>
          <Grid container spacing={0} justifyContent="flex-end"></Grid>
        </>
      )}
    </Box>
  );
};

export default StudentReading;
