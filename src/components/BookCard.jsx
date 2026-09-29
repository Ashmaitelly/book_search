import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router';

const BookCard = ({ volumeInfo, id }) => {
  //navigate hook
  const navigate = useNavigate();
  //navigate on click
  const handleClick = () => {
    navigate(`/book/?id=${id}`);
  };
  // truncate string
  const truncString = (text) => {
    return text.length < 30 ? text : text.substring(0, 30) + '...';
  };
  return (
    <Card className="Clickable" onClick={() => handleClick()}>
      <CardMedia
        component="img"
        height="330"
        width="230"
        image={volumeInfo.imageLinks && volumeInfo.imageLinks.thumbnail}
        alt={volumeInfo.title || ''}
      />
      <CardContent
        sx={{
          width: '230px',
          height: '190px',
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {volumeInfo.title && truncString(volumeInfo.title)}{' '}
          {`(${volumeInfo.publishedDate})`}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {volumeInfo.averageRating
            ? `${volumeInfo.averageRating}/5 ⭐`
            : 'No ratings'}{' '}
          {``}
          {volumeInfo.ratingsCount &&
            `(${volumeInfo.ratingsCount} rating${
              volumeInfo.ratingsCount === 1 ? '' : 's'
            })`}
        </Typography>
        <Typography gutterBottom component="div">
          by{' '}
          {`${volumeInfo.authors && truncString(volumeInfo.authors[0])} ${
            volumeInfo.authors &&
            (volumeInfo.authors.length > 2 ? 'et al.' : '')
          }`}
        </Typography>
        <Typography component="div">
          {volumeInfo.publisher && truncString(volumeInfo.publisher)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
