import { Button } from '@mui/material';

export default function MyButton({ children, onClick }) {
  return (
    <Button variant="contained" onClick={onClick}>
      {children}
    </Button>
  );
}; 