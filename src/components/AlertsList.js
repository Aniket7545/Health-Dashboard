import React from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Paper, Typography, Box } from '@mui/material';
import { Warning, Error, Info } from '@mui/icons-material';

export const AlertsList = ({ alerts }) => {
  const getAlertIcon = (severity) => {
    switch (severity) {
      case 'error':
        return <Error color="error" />;
      case 'warning':
        return <Warning color="warning" />;
      default:
        return <Info color="info" />;
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Active Alerts</Typography>
      <List>
        {alerts.map((alert, index) => (
          <ListItem 
            key={index}
            sx={{
              mb: 1,
              backgroundColor: alert.severity === 'error' ? 'error.lighter' : 'warning.lighter',
              borderRadius: 1
            }}
          >
            <ListItemIcon>
              {getAlertIcon(alert.severity)}
            </ListItemIcon>
            <ListItemText 
              primary={alert.title}
              secondary={
                <Box>
                  <Typography variant="body2">{alert.description}</Typography>
                  <Typography variant="caption" color="textSecondary">
                    Location: {alert.location} | Time: {alert.time}
                  </Typography>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};
