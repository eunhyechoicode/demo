import { useRouteError } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Container>
      <Box py={8} textAlign="center">
        <Typography variant="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography variant="h5">
          Sorry, an unexpected error has occurred.
        </Typography>
        <Typography color="text.secondary" mt={2}>
          {error.statusText || error.message}
        </Typography>
      </Box>
    </Container>
  );
} 