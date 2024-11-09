import React from 'react';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { Paper, Typography, Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';

const HYDERABAD_CENTER = [17.3850, 78.4867];
const AREAS = [
  { name: 'Miyapur', coords: [17.4937, 78.3728], radius: 2000 },
  { name: 'Kondapur', coords: [17.4605, 78.3783], radius: 1800 },
  { name: 'Gachibowli', coords: [17.4401, 78.3489], radius: 1500 },
  { name: 'Hitech City', coords: [17.4435, 78.3772], radius: 1700 },
];

export const DiseaseMap = ({ data, currentDay }) => {
  // Calculate intensity based on case numbers and current day
  const getIntensity = (areaName) => {
    const areaData = data.find(d => d.area === areaName);
    return areaData ? Math.min(0.8, (areaData.cases / 1000) * currentDay/10) : 0;
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Disease Spread Map</Typography>
      <Box sx={{ height: 400, width: '100%' }}>
        <MapContainer
          center={HYDERABAD_CENTER}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          {AREAS.map((area) => (
            <Circle
              key={area.name}
              center={area.coords}
              radius={area.radius}
              pathOptions={{
                fillColor: '#ff4444',
                fillOpacity: getIntensity(area.name),
                color: '#ff4444',
                weight: 1,
              }}
            >
              <Popup>
                <Typography variant="subtitle2">{area.name}</Typography>
                <Typography variant="body2">
                  Active Cases: {data.find(d => d.area === area.name)?.cases || 0}
                </Typography>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </Box>
    </Paper>
  );
};