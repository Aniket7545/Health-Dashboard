// src/components/DiseaseMonitoringDashboard.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  Paper,
  Divider 
} from '@mui/material';
import { 
  Timeline, 
  Assessment, 
  LocalHospital, 
  TrendingUp,
  Warning,
  People,
  BusinessCenter
} from '@mui/icons-material';
import { MetricCard } from './MetricCard';
import { AlertsList } from './AlertsList';
import { ImpactChart } from './ImpactChart';
import { DiseaseMap } from './DiseaseMap';
import { SimulationControls } from './SimulationControls';
import { INITIAL_STATE, SIMULATED_ALERTS, calculateNextState } from '../data/simulationData';

const DiseaseMonitoringDashboard = () => {
  const [simulationState, setSimulationState] = useState(INITIAL_STATE);
  const [isPlaying, setIsPlaying] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [impactData, setImpactData] = useState([]);

  useEffect(() => {
    let timer;
    if (isPlaying && simulationState.day < 15) {
      timer = setTimeout(() => {
        const nextState = calculateNextState(simulationState);
        
        // Update simulation state
        setSimulationState(prev => ({
          ...prev,
          day: prev.day + 1,
          areas: nextState.areas
        }));

        // Update impact data for charts
        setImpactData(prev => [...prev, {
          day: simulationState.day,
          actualCases: getTotalCases(),
          predictedCases: nextState.predictedCases,
          actualEconomicLoss: getTotalEconomicLoss(),
          predictedEconomicLoss: nextState.predictedEconomicLoss
        }]);

        // Add new alerts
        const dayAlerts = SIMULATED_ALERTS.filter(alert => alert.day === simulationState.day + 1);
        if (dayAlerts.length > 0) {
          setActiveAlerts(prev => [...prev, ...dayAlerts]);
        }
      }, 2000 / simulationSpeed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, simulationState, simulationSpeed]);

  const getTotalCases = () => 
    simulationState.areas.reduce((sum, area) => sum + area.cases, 0);

  const getTotalEconomicLoss = () =>
    simulationState.areas.reduce((sum, area) => sum + area.economicLoss, 0);

  const getAffectedAreas = () =>
    simulationState.areas.filter(area => area.cases > 0).length;

  const getPopulationAtRisk = () =>
    getTotalCases() * 15; // Assuming each case puts 15 people at risk

  const handleReset = () => {
    setSimulationState(INITIAL_STATE);
    setActiveAlerts([]);
    setImpactData([]);
    setIsPlaying(false);
  };

  const calculatePreventedCases = () => {
    if (impactData.length === 0) return 0;
    const latest = impactData[impactData.length - 1];
    return latest.actualCases - latest.predictedCases;
  };

  const calculateEconomicSavings = () => {
    if (impactData.length === 0) return 0;
    const latest = impactData[impactData.length - 1];
    return latest.actualEconomicLoss - latest.predictedEconomicLoss;
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" gutterBottom>
            Disease Surveillance System: Hyderabad
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Real-time monitoring and early outbreak detection system
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Simulation Controls */}
          <Grid item xs={12}>
            <SimulationControls
              isPlaying={isPlaying}
              currentDay={simulationState.day}
              maxDays={15}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onReset={handleReset}
              onSpeedChange={(_, value) => setSimulationSpeed(value)}
            />
          </Grid>

          {/* Metric Cards */}
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Total Cases"
              value={getTotalCases().toLocaleString()}
              icon={Timeline}
              color="#1976d2"
              trend={impactData.length > 1 ? 
                ((getTotalCases() - impactData[impactData.length - 2].actualCases) / 
                impactData[impactData.length - 2].actualCases * 100).toFixed(1) : 
                null}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Economic Impact"
              value={`₹${getTotalEconomicLoss().toFixed(1)}L`}
              icon={BusinessCenter}
              color="#2e7d32"
              trend={impactData.length > 1 ? 
                ((getTotalEconomicLoss() - impactData[impactData.length - 2].actualEconomicLoss) / 
                impactData[impactData.length - 2].actualEconomicLoss * 100).toFixed(1) : 
                null}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Affected Areas"
              value={getAffectedAreas()}
              icon={Warning}
              color="#ed6c02"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Population at Risk"
              value={getPopulationAtRisk().toLocaleString()}
              icon={People}
              color="#9c27b0"
            />
          </Grid>

          {/* Map and Charts */}
          <Grid item xs={12} md={8}>
            <DiseaseMap 
              data={simulationState.areas}
              currentDay={simulationState.day}
            />
          </Grid>

          {/* Alerts Panel */}
          <Grid item xs={12} md={4}>
            <AlertsList alerts={activeAlerts} />
          </Grid>

          {/* Impact Analysis */}
          <Grid item xs={12}>
            <ImpactChart data={impactData} />
          </Grid>

          {/* Summary Card (shows when simulation completes) */}
          {simulationState.day >= 15 && (
            <Grid item xs={12}>
              <Paper sx={{ p: 3, bgcolor: 'success.light' }}>
                <Typography variant="h5" gutterBottom color="success.dark">
                  Simulation Complete: Impact Summary
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h6">Cases Prevented</Typography>
                    <Typography variant="h4" color="success.dark">
                      {calculatePreventedCases().toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h6">Economic Savings</Typography>
                    <Typography variant="h4" color="success.dark">
                      ₹{calculateEconomicSavings().toFixed(1)}L
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h6">Early Detection Time</Typography>
                    <Typography variant="h4" color="success.dark">
                      48 Hours
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Typography variant="h6">Areas Protected</Typography>
                    <Typography variant="h4" color="success.dark">
                      3 Zones
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default DiseaseMonitoringDashboard;