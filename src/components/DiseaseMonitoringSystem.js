import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Tab,
  Tabs,
  FormControl,
  Select,
  MenuItem,
  Alert,
  Stack,
  Divider,
  useTheme
} from '@mui/material';
import {
  Timeline,
  Assessment,
  Notifications,
  LocalHospital,
  TrendingUp,
  People,
  Warning,
  Speed,
  NavigateNext
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Sample data
const trendData = [
  { date: '2024-01', cases: 120, recoveries: 95, tests: 450 },
  { date: '2024-02', cases: 150, recoveries: 120, tests: 520 },
  { date: '2024-03', cases: 200, recoveries: 180, tests: 600 },
  { date: '2024-04', cases: 180, recoveries: 160, tests: 550 },
  { date: '2024-05', cases: 160, recoveries: 150, tests: 500 },
];

const resourceData = [
  { name: 'Hospitals', available: 85, total: 100 },
  { name: 'ICUs', available: 45, total: 60 },
  { name: 'Ventilators', available: 120, total: 150 },
  { name: 'Vaccines', available: 2500, total: 3000 },
];

const riskData = [
  { name: 'High Risk', value: 30, color: '#ff4444' },
  { name: 'Medium Risk', value: 45, color: '#ffbb33' },
  { name: 'Low Risk', value: 25, color: '#00C851' },
];

const DiseaseMonitoringSystem = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('7d');

  const MetricCard = ({ title, value, subtitle, icon: Icon, trend, color }) => (
    <Card elevation={0} sx={{ height: '100%', borderRadius: 2 }}>
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
            <Icon sx={{ color: color }} />
          </Box>
          <Typography variant="h6" component="div" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
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
            {trend}% vs last week
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 3 }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Header */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                Disease Surveillance Dashboard
              </Typography>
              <FormControl sx={{ minWidth: 200 }}>
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  size="small"
                >
                  <MenuItem value="7d">Last 7 Days</MenuItem>
                  <MenuItem value="30d">Last 30 Days</MenuItem>
                  <MenuItem value="90d">Last 90 Days</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>

          {/* Metric Cards */}
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Active Cases"
              value="1,234"
              trend={5.8}
              icon={Timeline}
              color={theme.palette.primary.main}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Recovery Rate"
              value="94.2%"
              trend={2.1}
              icon={Assessment}
              color={theme.palette.success.main}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Critical Cases"
              value="45"
              trend={-3.2}
              icon={LocalHospital}
              color={theme.palette.error.main}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <MetricCard
              title="Tests Today"
              value="2,845"
              trend={12.5}
              icon={Speed}
              color={theme.palette.info.main}
            />
          </Grid>

          {/* Tabs */}
          <Grid item xs={12}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
            >
              <Tab label="Overview" icon={<Assessment />} iconPosition="start" />
              <Tab label="Alerts" icon={<Notifications />} iconPosition="start" />
              <Tab label="Resources" icon={<LocalHospital />} iconPosition="start" />
            </Tabs>
          </Grid>

          {tabValue === 0 && (
            <>
              {/* Trend Chart */}
              <Grid item xs={12} lg={8}>
                <Card elevation={0} sx={{ height: '100%', borderRadius: 2 }}>
                  <CardHeader 
                    title="Disease Trend Analysis"
                    action={
                      <IconButton>
                        <NavigateNext />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="cases" stroke={theme.palette.primary.main} name="Cases" />
                        <Line type="monotone" dataKey="recoveries" stroke={theme.palette.success.main} name="Recoveries" />
                        <Line type="monotone" dataKey="tests" stroke={theme.palette.info.main} name="Tests" strokeDasharray="5 5" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Risk Distribution */}
              <Grid item xs={12} lg={4}>
                <Card elevation={0} sx={{ height: '100%', borderRadius: 2 }}>
                  <CardHeader title="Risk Distribution" />
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={riskData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {riskData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </>
          )}

          {tabValue === 1 && (
            <Grid item xs={12}>
              <Stack spacing={2}>
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    High-Risk Alert: Miyapur Area
                  </Typography>
                  Unusual spike in respiratory cases detected. Immediate attention required.
                </Alert>
                <Alert severity="warning" sx={{ borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Medium-Risk Alert: Kondapur
                  </Typography>
                  Elevated cases reported in the past 24 hours. Monitoring situation.
                </Alert>
              </Stack>
            </Grid>
          )}

          {tabValue === 2 && (
            <Grid item xs={12}>
              <Card elevation={0} sx={{ borderRadius: 2 }}>
                <CardHeader title="Healthcare Resource Utilization" />
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={resourceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="available" name="Available" fill={theme.palette.success.main} />
                      <Bar dataKey="total" name="Total Capacity" fill={theme.palette.primary.main} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default DiseaseMonitoringSystem;