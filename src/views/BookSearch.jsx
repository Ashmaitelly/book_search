import React, { useState, useEffect, useMemo } from "react";
import BookAppBar from "../components/BookAppBar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BookCard from "../components/BookCard";
import Grid from "@mui/material/Grid";
import { Typography, CircularProgress } from "@mui/material";
import { GetInfo } from "../functions/GetInfo";

const PAGE_SIZE = 20;

export default function BookSearch() {
  //search state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  //books state
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  //pagination
  const [total, setTotal] = useState(0);
  const [bIndex, setBIndex] = useState(0);
  const [clicked, setClicked] = useState(1);

  // Debounce search input to avoid excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setBIndex(0);
      setClicked(1);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const pages = useMemo(() => {
    let temp = [];
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const start = Math.max(1, clicked - 2);
    const end = Math.min(totalPages, clicked + 2);

    for (let i = start; i <= end; i++) {
      temp.push(i);
    }
    return temp;
  }, [total, clicked]);

  //get books from API with useffect
  useEffect(() => {
    if (debouncedSearch !== "") {
      setLoading(true);
      GetInfo(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          debouncedSearch,
        )}&filter=free-ebooks` +
          `&key=${import.meta.env.VITE_API_KEY}` +
          `&orderBy=newest&maxResults=${PAGE_SIZE}` +
          `&startIndex=${bIndex}`,
      )
        .then((res) => {
          setBooks(res.data.items);
          setTotal(res.data.totalItems);
          setLoading(false);
        })
        .catch((err) => {
          alert(err);
          setLoading(false);
        });
    } else {
      setBooks([]);
      setTotal(0);
      setLoading(false);
    }
  }, [debouncedSearch, bIndex]);
  //set pages useEffect

  return (
    <div className="Flex-Col">
      <BookAppBar />
      <Box sx={{ mt: 2, mb: 2 }}>
        <TextField
          id="outlined-basic"
          label="Search by title, author, or keyword…"
          variant="outlined"
          style={{ width: "70%" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      <Grid
        container
        spacing={1}
        direction="row"
        sx={{ justifyContent: "center", alignItems: "flex-start" }}
      >
        {loading ? (
          <Box sx={{ mt: 4, mb: 4 }}>
            <CircularProgress />
          </Box>
        ) : debouncedSearch && (!books || books.length === 0) ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" color="textSecondary">
              No books found.
            </Typography>
          </Box>
        ) : (
          books &&
          books.map((book) => (
            <Grid key={book.etag}>
              <BookCard
                volumeInfo={book.volumeInfo}
                id={book.id}
                key={book.id}
              />
            </Grid>
          ))
        )}
      </Grid>
      {!loading && books && books.length > 0 ? (
        <Grid
          container
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          {/* map here */}
          {pages.map((page, index) => (
            <Typography
              key={index}
              className="Clickable"
              variant="h6"
              sx={{ mx: 1, my: 2, color: clicked === page ? "#00f" : "#000" }}
              onClick={() => {
                setBIndex((page - 1) * PAGE_SIZE);
                setClicked(page);
                window.scrollTo(0, 0);
              }}
            >
              {`${page}`}
            </Typography>
          ))}
        </Grid>
      ) : null}
    </div>
  );
}
