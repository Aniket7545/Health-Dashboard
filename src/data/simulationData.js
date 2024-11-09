// src/data/simulationData.js
export const INITIAL_STATE = {
    day: 1,
    areas: [
      { area: 'Miyapur', cases: 10, economicLoss: 0.1 },
      { area: 'Kondapur', cases: 0, economicLoss: 0 },
      { area: 'Gachibowli', cases: 0, economicLoss: 0 },
      { area: 'Hitech City', cases: 0, economicLoss: 0 },
    ],
    alerts: []
};

export const SIMULATED_ALERTS = [
    {
      day: 2,
      severity: 'warning',
      title: 'Unusual Pattern Detected',
      description: 'ML models detected abnormal respiratory case pattern',
      location: 'Miyapur',
      time: '08:30 AM'
    },
    {
      day: 3,
      severity: 'error',
      title: 'Outbreak Confirmation',
      description: 'Disease cluster confirmed. Traditional systems would detect in 48-72 hours',
      location: 'Miyapur',
      time: '10:15 AM'
    },
    {
      day: 4,
      severity: 'warning',
      title: 'Spread Risk Alert',
      description: 'High risk of spread based on commuter patterns',
      location: 'Kondapur',
      time: '09:45 AM'
    },
    // Add more alerts as needed
];

export const calculatePredictedCases = (currentState) => {
    const predictionDays = 7; // Predict for next 7 days
    const growthRate = 1.8;
    let totalPredicted = 0;
    
    // Calculate total current cases
    const currentTotalCases = currentState.areas.reduce((sum, area) => sum + area.cases, 0);
    
    // Simple exponential growth prediction
    totalPredicted = Math.floor(currentTotalCases * Math.pow(growthRate, predictionDays));
    
    return totalPredicted;
};

export const calculatePredictedLoss = (currentState) => {
    const predictionDays = 7; // Predict for next 7 days
    const economicGrowthRate = 1.7;
    let totalPredictedLoss = 0;
    
    // Calculate total current economic loss
    const currentTotalLoss = currentState.areas.reduce((sum, area) => sum + area.economicLoss, 0);
    
    // Predict future economic loss
    totalPredictedLoss = currentTotalLoss * Math.pow(economicGrowthRate, predictionDays);
    
    // Round to 2 decimal places
    return Math.round(totalPredictedLoss * 100) / 100;
};

export const calculateNextState = (currentState) => {
    const growthRate = 1.8; // Base growth rate
    const earlyDetectionFactor = 0.6; // Reduction factor with early detection

    return {
        day: currentState.day + 1,
        areas: currentState.areas.map(area => ({
            ...area,
            cases: area.cases > 0 ? 
                Math.floor(area.cases * growthRate) : 
                shouldStartInfection(area.area, currentState.day) ? 10 : 0,
            economicLoss: area.cases > 0 ?
                area.economicLoss * 1.7 :
                shouldStartInfection(area.area, currentState.day) ? 0.1 : 0
        })),
        predictedCases: calculatePredictedCases(currentState),
        predictedEconomicLoss: calculatePredictedLoss(currentState)
    };
};

const shouldStartInfection = (area, day) => {
    const startDays = {
        'Miyapur': 1,
        'Kondapur': 4,
        'Gachibowli': 6,
        'Hitech City': 8
    };
    return day === startDays[area];
};