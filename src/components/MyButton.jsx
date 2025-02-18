import PropTypes from 'prop-types';
import { Button } from '@mui/material';

export default function MyButton({ children, ...props }) {
  return (
    <Button variant="contained" color="primary" {...props}>
      {children}
    </Button>
  );
}

MyButton.propTypes = {
  children: PropTypes.node,
};
