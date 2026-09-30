import React, { useState, useEffect } from "react";
import BookAppBar from "../components/BookAppBar";
import { useNavigate, useSearchParams } from "react-router";
import "../App.css";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import PreviewHeader from "../components/PreviewHeader";
import PreviewFooter from "../components/PreviewFooter";
import BookViewer from "../components/BookViewer";
import { GetInfo } from "../functions/GetInfo";

const BookInfo = () => {
  const navigate = useNavigate();
  //search params
  const [searchParams] = useSearchParams();
  const [book, setBook] = useState({});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    GetInfo(
      `https://www.googleapis.com/books/v1/volumes/${encodeURIComponent(searchParams.get("id") ?? "")}?key=${import.meta.env.VITE_API_KEY}`,
    )
      .then((res) => {
        setBook(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        alert("Error getting book data");
        navigate(-1);
      });
  }, [searchParams, navigate]);

  return (
    <div>
      <BookAppBar />
      <Container maxWidth="md" sx={{ py: 3 }}>
        {!loaded ? (
          <CircularProgress sx={{ mt: 6 }} />
        ) : (
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            <PreviewHeader
              title={book.volumeInfo.title}
              language={book.volumeInfo.language}
              authors={book.volumeInfo.authors}
              publisher={book.volumeInfo.publisher}
            />
            <BookViewer id={searchParams.get("id")} />
            <PreviewFooter
              pages={book.volumeInfo.pageCount}
              epub={book.accessInfo?.epub?.downloadLink}
              pdf={book.accessInfo?.pdf?.downloadLink}
            />
          </Paper>
        )}
      </Container>
    </div>
  );
};

export default BookInfo;
