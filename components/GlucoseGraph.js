import React from 'react';
import { Line } from 'react-chartjs-2';

const GlucoseGraph = ({ glucoseData }) => {
  const data = {
    labels: glucoseData.map(dataPoint => dataPoint.time),
    datasets: [
      {
        label: 'Glucose',
        data: glucoseData.map(dataPoint => dataPoint.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
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

  return <Line data={data} options={options} />;
};

export default GlucoseGraph;
