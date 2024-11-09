import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { TrendingUp } from '@mui/icons-material'; // Add this import

export const MetricCard = ({ title, value, trend, icon: Icon, color }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box
          sx={{
            backgroundColor: `${color}15`,
            borderRadius: '50%',
            p: 1,
            mr: 2,
          }}
        >
          <Icon sx={{ color }} />
        </Box>
        <Typography variant="h6" color="textSecondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
      {trend && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TrendingUp
            sx={{
              color: trend >= 0 ? 'success.main' : 'error.main',
              mr: 1,
              fontSize: '1rem',
            }}
          />
          <Typography
            variant="body2"
            color={trend >= 0 ? 'success.main' : 'error.main'}
          >
            {trend}% vs last period
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);