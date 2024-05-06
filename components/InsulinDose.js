import React from 'react';
import { Bar } from 'react-chartjs-2';

const InsulinDose = ({ insulinData }) => {
  const data = {
    labels: insulinData.map(dataPoint => dataPoint.time),
    datasets: [
      {
        label: 'Insulin Dose',
        data: insulinData.map(dataPoint => dataPoint.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default InsulinDose;
