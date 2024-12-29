import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

import APP_NAME from '../fixtures/app';

export default function MyDrawer({ navItems }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = path => {
    navigate(`/${path.toLowerCase()}`);
  };

  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h6" component="div" padding={2}>
          {APP_NAME}
        </Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              onClick={() => handleNavigation(item)}
              selected={location.pathname === `/${item.toLowerCase()}`}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{ align: 'center' }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
