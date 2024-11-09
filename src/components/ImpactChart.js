import React from 'react';
import { Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ImpactChart = ({ data }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Disease Impact Analysis</Typography>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" label={{ value: 'Days Since Detection', position: 'bottom' }} />
        <YAxis yAxisId="left" label={{ value: 'Number of Cases', angle: -90, position: 'insideLeft' }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: 'Economic Impact (₹M)', angle: 90, position: 'insideRight' }} />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="actualCases" stroke="#ff4444" name="Without Early Detection" />
        <Line yAxisId="left" type="monotone" dataKey="predictedCases" stroke="#00C851" name="With Early Detection" />
        <Line yAxisId="right" type="monotone" dataKey="actualEconomicLoss" stroke="#ff8800" name="Economic Loss (Actual)" />
        <Line yAxisId="right" type="monotone" dataKey="predictedEconomicLoss" stroke="#33b5e5" name="Economic Loss (Predicted)" />
      </LineChart>
    </ResponsiveContainer>
  </Paper>
);
