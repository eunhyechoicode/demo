import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import MyDrawer from '../MyDrawer';
import PATHS from '../../fixtures/paths';
import APP_NAME from '../../fixtures/app';

const DRAWER_WIDTH = 240;

const navItems = Object.keys(PATHS);

export default function MyPage({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" flex={1}>
            {APP_NAME}
          </Typography>
          <Box>
            {navItems.map(item => (
              <Button
                key={item}
                color="inherit"
                onClick={() => navigate(PATHS[item])}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          style: { width: DRAWER_WIDTH },
        }}
      >
        <MyDrawer navItems={navItems} onClick={handleDrawerToggle} />
      </Drawer>
      <Container component="main">
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
}
