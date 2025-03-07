import axios from 'axios';

const API_URL = 'http://localhost:5001/collections';

// Fetch all albums from the API
export const getAllAlbums = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
};

// Fetch details of a specific album by its ID
export const getAlbumDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching album details:", error);
    return null;
  }
};
