import React from 'react';
import GlucoseGraph from './GlucoseGraph';
import InsulinDose from './InsulinDose';
import InsulinDoseOptimization from './InsulinDoseOptimization';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <GlucoseGraph />
      <InsulinDose />
      <InsulinDoseOptimization />
    </div>
  );
};

export default Dashboard;
