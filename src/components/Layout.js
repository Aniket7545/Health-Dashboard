import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Timeline as TimelineIcon,
  Home as HomeIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const Layout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { text: 'Disease Monitoring', path: '/disease-monitoring', icon: <TimelineIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={handleDrawerToggle}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}
            
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 700,
                letterSpacing: '-0.5px',
              }}
            >
              HealthWatch
            </Typography>

            {!isMobile && (
              <Box sx={{ ml: 4, display: 'flex', gap: 2 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: location.pathname === item.path ? 'primary.main' : 'text.primary',
                      '&:hover': {
                        bgcolor: 'primary.lighter',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
