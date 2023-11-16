import { useContext } from 'react';
import { PlacesContext } from '../context/places';
import { MapContext } from '../context/map';

export const MyLocationButton = () => {
  const { userLocation } = useContext(PlacesContext);
  const { isMapReady, map } = useContext(MapContext);

  function returnToMyLocation() {
    if (!isMapReady) return;
    if (!userLocation) return;

    map?.flyTo({
      zoom: 14,
      center: userLocation,
    });
  }

  return (
    <button
      className="my-location-btn btn btn-primary btn-circle btn-xl"
      onClick={returnToMyLocation}
    >
      <i className="fa-solid fa-location-crosshairs"></i>
    </button>
  );
};
