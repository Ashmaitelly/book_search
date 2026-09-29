import React from 'react';

const BookViewer = ({ id }) => {
  return (
    <iframe
      src={`https://books.google.com.lb/books?id=${id}&pg=PP5&output=embed`}
      title="book"
      style={{ height: '70vh' }}
    ></iframe>
  );
};

export default BookViewer;
