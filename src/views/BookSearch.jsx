import React, { useState, useEffect } from "react";
import BookAppBar from "../components/BookAppBar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BookCard from "../components/BookCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import Pagination from "@mui/material/Pagination";
import SearchIcon from "@mui/icons-material/Search";
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

  //get books from API with useffect
  useEffect(() => {
    let cancelled = false;
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
          if (cancelled) return;
          setBooks(res.data.items);
          setTotal(res.data.totalItems);
          setLoading(false);
        })
        .catch((err) => {
          if (cancelled) return;
          alert(err);
          setLoading(false);
        });
    } else {
      setBooks([]);
      setTotal(0);
      setLoading(false);
    }
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, bIndex]);

  // Clear results immediately when the input is emptied
  useEffect(() => {
    if (search === "") {
      setDebouncedSearch("");
      setBIndex(0);
      setClicked(1);
    }
  }, [search]);
  //set pages useEffect

  return (
    <Box>
      <BookAppBar />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <TextField
          fullWidth
          autoFocus
          placeholder="Search by title, author, or keyword…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ maxWidth: 640, mx: "auto", display: "flex", bgcolor: "background.paper", borderRadius: 3 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        {!debouncedSearch && !loading && (
          <Typography variant="h6" color="text.secondary" sx={{ mt: 8, textAlign: "center" }}>
            Search for free ebooks to get started
          </Typography>
        )}
        <Grid
          container
          spacing={3}
          sx={{ mt: 2, justifyContent: "center", alignItems: "stretch" }}
        >
          {loading ? (
            <Box sx={{ mt: 4, mb: 4 }}>
              <CircularProgress />
            </Box>
          ) : debouncedSearch && (!books || books.length === 0) ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No books found.
              </Typography>
            </Box>
          ) : (
            books &&
            books.map((book) => (
              <Grid key={book.id}>
                <BookCard volumeInfo={book.volumeInfo} id={book.id} />
              </Grid>
            ))
          )}
        </Grid>
        {!loading && books && books.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(total / PAGE_SIZE)}
              page={clicked}
              color="primary"
              onChange={(_, page) => {
                setBIndex((page - 1) * PAGE_SIZE);
                setClicked(page);
                window.scrollTo(0, 0);
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
