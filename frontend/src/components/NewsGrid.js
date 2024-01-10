import React, { useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Pagination } from '@mui/material';

const dummyCardsData = [
  { title: 'Card 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', hasImage: true },
  { title: 'Card 2', content: 'Curabitur facilisis, justo ut elementum auctor, ex mi viverra est, vel efficitur purus libero non nunc.', hasImage: false },
  { title: 'Card 3', content: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.', hasImage: true },
  { title: 'Card 4', content: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.', hasImage: false },
  { title: 'Card 5', content: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.', hasImage: true },
  { title: 'Card 6', content: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.', hasImage: false },
  // Add more dummy data as needed
];

const CardsGrid = ({ cards, cardsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalCards = cards.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = cards.slice(startIndex, endIndex);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Container>
      <Grid container spacing={3}>
        {currentCards.map((card, index) => (
          <Grid key={index} item xs={12} md={4}>
            <Card>
              {card.hasImage && <CardMedia component="img" height="140" image="your-image-url.jpg" alt="Card Image" />}
              <CardContent>
                <Typography variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
      />
    </Container>
  );
};

const NewsGrid = () => {
  return <CardsGrid cards={dummyCardsData} cardsPerPage={3} />;
};

export default NewsGrid;