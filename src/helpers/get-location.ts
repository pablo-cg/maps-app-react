import { MapboxCoords } from '../interfaces';

export const getLocation = async (): Promise<MapboxCoords> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (error) => {
        console.log('get-location | error:', error);
        alert('No pudo obtener la Geolocalización');
        reject(error);
      }
    );
  });
};
