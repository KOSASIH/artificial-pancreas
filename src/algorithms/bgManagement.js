import { getGlucoseData } from '../api/glucoseMonitor.js';

const BG_TARGET_RANGE = [70, 180];
const HYPO_THRESHOLD = 70;
const HYPER_THRESHOLD = 180;

const calculateBGManagementAlgorithm = async (userId, options = {}) => {
  const {
    glucoseData = await getGlucoseData(userId, options),
  } = options;

  const bgManagementAlgorithm = {
    hypoglycemia: [],
    hyperglycemia: [],
    inTargetRange: [],
  };

  glucoseData.forEach((dataPoint) => {
    if (dataPoint.value < HYPO_THRESHOLD) {
      bgManagementAlgorithm.hypoglycemia.push(dataPoint);
    } else if (dataPoint.value > HYPER_THRESHOLD) {
      bgManagementAlgorithm.hyperglycemia.push(dataPoint);
    } else {
      bgManagementAlgorithm.inTargetRange.push(dataPoint);
    }
  });

  return bgManagementAlgorithm;
};

export { calculateBGManagementAlgorithm, BG_TARGET_RANGE, HYPO_THRESHOLD, HYPER_THRESHOLD };
