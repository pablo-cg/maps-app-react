import axios from 'axios';

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    access_token: import.meta.env.VITE_MAP_TOKEN,
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
  },
});

export default directionsApi;
