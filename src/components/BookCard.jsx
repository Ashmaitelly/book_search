import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router';

const BookCard = ({ volumeInfo, id }) => {
  //navigate hook
  const navigate = useNavigate();
  const authors = volumeInfo.authors || [];
  const year = volumeInfo.publishedDate?.slice(0, 4);

  return (
    <Card
      sx={{
        width: 230,
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/book/?id=${encodeURIComponent(id)}`)}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'flex-start' }}
      >
        <CardMedia
          component="img"
          height="300"
          image={volumeInfo.imageLinks?.thumbnail}
          alt={volumeInfo.title || ''}
          sx={{ objectFit: 'cover', bgcolor: 'grey.200' }}
        />
        <CardContent sx={{ textAlign: 'left' }}>
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {volumeInfo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {authors.length > 0 ? `by ${authors[0]}${authors.length > 1 ? ' et al.' : ''}` : 'Unknown author'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 0.5 }}>
            {volumeInfo.averageRating ? (
              <>
                <Rating value={volumeInfo.averageRating} precision={0.5} size="small" readOnly />
                <Typography variant="caption" color="text.secondary">
                  ({volumeInfo.ratingsCount})
                </Typography>
              </>
            ) : (
              <Typography variant="caption" color="text.secondary">
                No ratings
              </Typography>
            )}
          </Box>
          <Typography variant="caption" color="text.secondary" component="div" noWrap>
            {[year, volumeInfo.publisher].filter(Boolean).join(' · ')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookCard;
