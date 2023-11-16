import { useContext, useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import { Loading } from '.';
import { MapContext } from '../context/map';
import { PlacesContext } from '../context/places';

export const MapView = () => {
  const { userLocation, isLoading } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  const mapContainer = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new Map({
        container: mapContainer.current!, // container ID
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

      setMap(map);
    }
  }, [isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return <div ref={mapContainer} className="map-container"></div>;
};
