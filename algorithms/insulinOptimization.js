import { getInsulinData, updateInsulinDeliverySettings } from '../api/insulinDelivery.js';
import { calculateBGManagementAlgorithm } from './bgManagement.js';

const BG_TARGET_RANGE = [70, 180];
const INSULIN_SENSITIVITY = 0.05;
const INSULIN_MAX_DOSE = 10;
const INSULIN_MIN_DOSE = 0;
const INSULIN_DELAY = 30;

const calculateInsulinOptimizationAlgorithm = async (userId, options = {}) => {
  const {
    glucoseData = await getGlucoseData(userId, options),
    insulinData = await getInsulinData(userId, options),
    settings = await getInsulinDeliverySettings(userId, options),
  } = options;

  const bgManagementAlgorithm = await calculateBGManagementAlgorithm(userId, { glucoseData });

  const insulinOptimizationAlgorithm = {
    recommendedInsulinDose: 0,
  };

  if (bgManagementAlgorithm.hypoglycemia.length > 0) {
    // Reduce insulin dose if glucose is low
    insulinOptimizationAlgorithm.recommendedInsulinDose = Math.max(
      insulinOptimizationAlgorithm.recommendedInsulinDose - (INSULIN_SENSITIVITY * bgManagementAlgorithm.hypoglycemia.length),
      INSULIN_MIN_DOSE,
    );
  } else if (bgManagementAlgorithm.hyperglycemia.length > 0) {
    // Increase insulin dose if glucose is high
    insulinOptimizationAlgorithm.recommendedInsulinDose = Math.min(
      insulinOptimizationAlgorithm.recommendedInsulinDose + (INSULIN_SENSITIVITY * bgManagementAlgorithm.hyperglycemia.length),
      INSULIN_MAX_DOSE,
    );
  } else if (bgManagementAlgorithm.inTargetRange.length > 0) {
    // Maintain current insulin dose if glucose is in target range
    insulinOptimizationAlgorithm.recommendedInsulinDose = settings.insulinDose;
  }

  // Apply insulin dose delay
  insulinOptimizationAlgorithm.recommendedInsulinDose = Math.max(
    insulinOptimizationAlgorithm.recommendedInsulinDose - INSULIN_DELAY,
    INSULIN_MIN_DOSE,
  );

  // Update insulin delivery settings
  await updateInsulinDeliverySettings(userId, {
    ...settings,
    insulinDose: insulinOptimizationAlgorithm.recommendedInsulinDose,
  });

  return insulinOptimizationAlgorithm;
};

export { calculateInsulinOptimizationAlgorithm, BG_TARGET_RANGE, INSULIN_SENSITIVITY, INSULIN_MAX_DOSE, INSULIN_MIN_DOSE, INSULIN_DELAY };
