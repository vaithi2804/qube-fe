import axios from 'axios';

const API_URL = 'http://localhost:5001/collections';

export const getAllAlbums = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    return [];
  }
};

export const getAlbumDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching album details:", error);
    return null;
  }
};
