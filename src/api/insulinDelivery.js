import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'https://api.example.com/insulin';
const TOKEN = 'YOUR_API_TOKEN';

const getInsulinData = async (userId, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    const response = await axios.get(`${BASE_URL}/${userId}`, { headers, params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching insulin data for user ${userId}:`, error.message);
    throw error;
  }
};

const postInsulinData = async (userId, insulinData, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    const response = await axios.post(`${BASE_URL}/${userId}`, {
      ...insulinData,
      id: insulinData.id || uuidv4(),
    }, { headers, params });
    return response.data;
  } catch (error) {
    console.error(`Error posting insulin data for user ${userId}:`, error.message);
    throw error;
  }
};

const deleteInsulinData = async (userId, insulinDataId, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    await axios.delete(`${BASE_URL}/${userId}/${insulinDataId}`, { headers, params });
  } catch (error) {
    console.error(`Error deleting insulin data with ID ${insulinDataId} for user ${userId}:`, error.message);
    throw error;
  }
};

const updateInsulinData = async (userId, insulinData, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    await axios.put(`${BASE_URL}/${userId}/${insulinData.id}`, insulinData, { headers, params });
  } catch (error) {
    console.error(`Error updating insulin data with ID ${insulinData.id} for user ${userId}:`, error.message);
    throw error;
  }
};

const getInsulinDeliverySettings = async (userId, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    const response = await axios.get(`${BASE_URL}/settings/${userId}`, { headers, params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching insulin delivery settings for user ${userId}:`, error.message);
    throw error;
  }
};

const updateInsulinDeliverySettings = async (userId, settings, options = {}) => {
  const {
    headers = { Authorization: `Bearer ${TOKEN}` },
    params = {},
  } = options;

  try {
    await axios.put(`${BASE_URL}/settings/${userId}`, settings, { headers, params });
  } catch (error) {
    console.error(`Error updating insulin delivery settings for user ${userId}:`, error.message);
    throw error;
  }
};

export { getInsulinData, postInsulinData, deleteInsulinData, updateInsulinData, getInsulinDeliverySettings, updateInsulinDeliverySettings };
