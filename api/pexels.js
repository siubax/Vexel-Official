import axios from 'axios';
import { PEXELS_API_KEY } from '../constants/api';

const baseUrl = 'https://api.pexels.com/v1';

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: `${baseUrl}${endpoint}`,
        params: params ? params : {},
        headers: {
            Authorization: PEXELS_API_KEY
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('API Call Error: ', error.message);
        return {};
    }
}

export const fetchCuratedPhotos = (params) => {
    return apiCall('/curated', params);
}

export const searchPhotos = (params) => {
    return apiCall('/search', params);
}