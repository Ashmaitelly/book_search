import './App.css';
import React from 'react';
import SignIn from './views/SignIn';
import AuthorSearch from './views/AuthorSearch';
import { HashRouter, Routes, Route } from 'react-router';
import BookInfo from './views/BookInfo';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route path="/search" element={<AuthorSearch />} />
          <Route path="/book" element={<BookInfo />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
