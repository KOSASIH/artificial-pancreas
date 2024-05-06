import axios from 'axios';

const getInsulinData = async (userId, startDate, endDate) => {
  try {
    const response = await axios.get(`/api/insulinData/${userId}`, {
      params: {
        startDate,
        endDate,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching insulin data:', error);
    throw error;
  }
};

const filterInsulinDataByDate = (insulinData, startDate, endDate) => {
  return insulinData.filter(dataPoint => {
    const date = new Date(dataPoint.time);
    return date >= startDate && date <= endDate;
  });
};

const sortInsulinDataByTime = (insulinData) => {
  return insulinData.sort((a, b) => {
    const dateA = new Date(a.time);
    const dateB = new Date(b.time);
    return dateA - dateB;
  });
};

export { getInsulinData, filterInsulinDataByDate, sortInsulinDataByTime };
