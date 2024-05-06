import axios from 'axios';

const getGlucoseData = async (userId, startDate, endDate) => {
  try {
    const response = await axios.get(`/api/glucoseData/${userId}`, {
      params: {
        startDate,
        endDate,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching glucose data:', error);
    throw error;
  }
};

const filterGlucoseDataByDate = (glucoseData, startDate, endDate) => {
  return glucoseData.filter(dataPoint => {
    const date = new Date(dataPoint.time);
    return date >= startDate && date <= endDate;
  });
};

const sortGlucoseDataByTime = (glucoseData) => {
  return glucoseData.sort((a, b) => {
    const dateA = new Date(a.time);
    const dateB = new Date(b.time);
    return dateA - dateB;
  });
};

export { getGlucoseData, filterGlucoseDataByDate, sortGlucoseDataByTime };
