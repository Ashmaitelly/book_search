import React from 'react';

const BookViewer = ({ id }) => {
  return (
    <iframe
      src={`https://books.google.com.lb/books?id=${encodeURIComponent(id)}&pg=PP5&output=embed`}
      title="book"
      sandbox="allow-scripts allow-same-origin allow-popups"
      referrerPolicy="no-referrer"
      style={{ height: '70vh' }}
    ></iframe>
  );
};

export default BookViewer;
