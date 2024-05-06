import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://api.example.com/glucose';
const TOKEN = 'YOUR_API_TOKEN';

const getGlucoseData = async (userId, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    const response = await axios.get(`${BASE_URL}/${userId}`, { headers, params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching glucose data for user ${userId}:`, error.message);
    throw error;
  }
};

const postGlucoseData = async (userId, glucoseData, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    const response = await axios.post(`${BASE_URL}/${userId}`, {
      ...glucoseData,
      id: glucoseData.id || uuidv4(),
    }, { headers, params });
    return response.data;
  } catch (error) {
    console.error(`Error posting glucose data for user ${userId}:`, error.message);
    throw error;
  }
};

const deleteGlucoseData = async (userId, glucoseDataId, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    await axios.delete(`${BASE_URL}/${userId}/${glucoseDataId}`, { headers, params });
  } catch (error) {
    console.error(`Error deleting glucose data with ID ${glucoseDataId} for user ${userId}:`, error.message);
    throw error;
  }
};

const updateGlucoseData = async (userId, glucoseData, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    await axios.put(`${BASE_URL}/${userId}/${glucoseData.id}`, glucoseData, { headers, params });
  } catch (error) {
    console.error(`Error updating glucose data with ID ${glucoseData.id} for user ${userId}:`, error.message);
    throw error;
  }
};

export { getGlucoseData, postGlucoseData, deleteGlucoseData, updateGlucoseData };
