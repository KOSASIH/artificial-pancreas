import React from 'react';
import { Button } from 'antd';
import { calculateInsulinOptimizationAlgorithm } from '../algorithms/insulinOptimization';

const InsulinDoseOptimization = ({ userId, insulinData, glucoseData, settings }) => {
  const handleOptimize = async () => {
    const optimizationAlgorithm = await calculateInsulinOptimizationAlgorithm(userId, {
      insulinData,
      glucoseData,
      settings,
    });

    console.log('Optimized Insulin Dose:', optimizationAlgorithm.recommendedInsulinDose);
  };

  return <Button onClick={handleOptimize}>Optimize Insulin Dose</Button>;
};

export default InsulinDoseOptimization;
