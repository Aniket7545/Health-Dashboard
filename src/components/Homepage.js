import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Avatar,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Timeline as TimelineIcon,
  Assessment as AssessmentIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
//import Navbar from './Navbar';

const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(12, 0),
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  padding: theme.spacing(2),
  display: 'inline-flex',
  marginBottom: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[10],
    '& .MuiBox-root': {
      transform: 'scale(1.1)',
    },
  },
}));

const FlowChartStep = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[10],
  },
}));

const ArrowIcon = styled(ArrowForwardIcon)(({ theme }) => ({
  fontSize: 40,
  color: theme.palette.primary.main,
  margin: theme.spacing(0, 2),
}));


const Homepage = () => {

  const features = [
    { icon: <TimelineIcon />, title: "Real-time Monitoring", description: "Track disease outbreaks and health metrics in real-time with advanced analytics." },
    { icon: <AssessmentIcon />, title: "Predictive Analysis", description: "Leverage AI-powered predictions to stay ahead of potential health crises." },
    { icon: <SpeedIcon />, title: "Quick Response", description: "Enable rapid response to health emergencies with instant alerts and notifications." },
    { icon: <SecurityIcon />, title: "Secure Platform", description: "Ensure data privacy and security with enterprise-grade protection." },
  ];

  const steps = [
    { title: "Data Collection", description: "Gather health data from various sources in real-time." },
    { title: "AI Analysis", description: "Process data using advanced AI algorithms for insights." },
    { title: "Actionable Insights", description: "Receive alerts and recommendations for quick response." },
  ];

  const testimonials = [
    { name: "Dr. Sarah Johnson", role: "Public Health Officer", quote: "This platform has revolutionized how we monitor and respond to health crises. It's an invaluable tool for public health." },
    { name: "Mark Thompson", role: "Hospital Administrator", quote: "The predictive analysis feature has helped us prepare for potential outbreaks before they happen. It's truly game-changing." },
    { name: "Lisa Chen", role: "Epidemiologist", quote: "The real-time data and intuitive interface make it easy to track and analyze health trends across different regions." },
  ];

  return (
    <Box>
      {/* Navbar */}
      {/* <Navbar /> */}

      {/* Hero Section */}
      <GradientBox>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold', mt: { xs: 4, md: 0 } }}>
                Advanced Health Surveillance Platform
              </Typography>
              <Typography variant="h5" paragraph sx={{ mb: 4 }}>
                Monitor, predict, and respond to health emergencies with our cutting-edge platform.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  component={Link}
                  to="/dashboard"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                >
                  View Dashboard
                </Button>
                <Button
                  component={Link}
                  to="/disease-monitoring"
                  variant="outlined"
                  color="inherit"
                  size="large"
                  sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
                >
                  Disease Monitoring
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                alt="Health Monitoring Dashboard"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: 8,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </GradientBox>

      {/* How It Works Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
            How It Works
          </Typography>
          <Grid container spacing={4} justifyContent="center" alignItems="center">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <Grid item xs={12} md={3}>
                  <FlowChartStep elevation={3}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2">
                      {step.description}
                    </Typography>
                  </FlowChartStep>
                </Grid>
                {index < steps.length - 1 && (
                  <Grid item xs={12} md={1} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                    <ArrowIcon />
                  </Grid>
                )}
              </React.Fragment>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
            Key Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <StyledCard elevation={3}>
                  <FeatureIcon>
                    {feature.icon}
                  </FeatureIcon>
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonial Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 6 }}>
            What Our Users Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease-in-out', '&:hover': { transform: 'translateY(-10px)' } }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar src={`https://i.pravatar.cc/150?img=${index + 1}`} sx={{ width: 60, height: 60, mr: 2 }} />
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{testimonial.name}</Typography>
                        <Typography variant="body2" color="text.secondary">{testimonial.role}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>"{testimonial.quote}"</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <GradientBox>
        <Container maxWidth="md">
          <Box textAlign="center">
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Ready to Transform Your Health Surveillance?
            </Typography>
            <Typography variant="h6" paragraph sx={{ mb: 4 }}>
              Join the leading health organizations using our platform to stay ahead of health crises.
            </Typography>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                bgcolor: 'white', 
                color: 'primary.main', 
                '&:hover': { 
                  bgcolor: 'grey.100',
                  transform: 'translateY(-5px)',
                },
                transition: 'transform 0.3s ease-in-out',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
              }}
            >
              Get Started Now
            </Button>
          </Box>
        </Container>
      </GradientBox>
    </Box>
  );
};

export default Homepage;