import React from 'react';
import { Paper, Button, Typography, Box, Slider } from '@mui/material';
import { PlayArrow, Pause, Replay } from '@mui/icons-material';

export const SimulationControls = ({ 
  isPlaying, 
  currentDay, 
  maxDays, 
  onPlay, 
  onPause, 
  onReset, 
  onSpeedChange 
}) => (
  <Paper sx={{ p: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Typography variant="h6">Simulation Controls</Typography>
      <Typography>Day {currentDay} of {maxDays}</Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      {isPlaying ? (
        <Button variant="contained" color="primary" onClick={onPause} startIcon={<Pause />}>
          Pause
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={onPlay} startIcon={<PlayArrow />}>
          Play
        </Button>
      )}
      <Button variant="outlined" onClick={onReset} startIcon={<Replay />}>
        Reset
      </Button>
    </Box>
    <Box sx={{ width: '100%' }}>
      <Typography gutterBottom>Simulation Speed</Typography>
      <Slider
        defaultValue={1}
        step={0.5}
        marks
        min={0.5}
        max={3}
        valueLabelDisplay="auto"
        onChange={onSpeedChange}
      />
    </Box>
  </Paper>
);