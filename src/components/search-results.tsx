import { useContext, useState } from 'react';
import { Feature } from '../interfaces/places';
import { MapContext } from '../context/map';
import { PlacesContext } from '../context/places';
import { PlacesLoader } from '.';
import { LngLatLike } from 'mapbox-gl';

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteDirections } = useContext(MapContext);

  const [activePlaceId, setActivePlaceId] = useState('');

  if (isLoadingPlaces) {
    return <PlacesLoader />;
  }

  function onPlaceClick(place: Feature) {
    map?.flyTo({
      zoom: 14,
      center: place.center as LngLatLike,
    });

    setActivePlaceId(place.id);
  }

  async function getDirections(place: Feature) {
    if (!userLocation) return;

    const [longitude, latitude] = place.center;

    await getRouteDirections(userLocation, [longitude, latitude]);
  }

  return (
    <ul className={`list-group ${places.length ? 'mt-3' : ''}`}>
      {places.map((place) => (
        <li
          className={`list-group-item list-group-item-action pointer ${
            place.id === activePlaceId ? 'active' : ''
          }`}
          key={place.id}
          onClick={() => onPlaceClick(place)}
        >
          <h6>{place.text_es}</h6>
          <p className="" style={{ fontSize: '12px' }}>
            {place.place_name}
          </p>
          <button
            onClick={() => getDirections(place)}
            className={`btn btn-sm ${
              place.id === activePlaceId
                ? 'btn-outline-light'
                : 'btn-outline-primary'
            } `}
          >
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
