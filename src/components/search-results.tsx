import { useContext } from 'react';
import { PlacesContext } from '../context/places';
import { PlacesLoader } from '.';

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);

  if (isLoadingPlaces) {
    return <PlacesLoader />;
  }

  return (
    <ul className={`list-group ${places.length ? 'mt-3' : ''}`}>
      {places.map((place) => (
        <li className="list-group-item list-group-action" key={place.id}>
          <h6>{place.text_es}</h6>
          <p className="text-muted" style={{ fontSize: '12px' }}>
            {place.place_name}
          </p>
          <button className="btn btn-sm btn-outline-primary">
            Direcciones
          </button>
        </li>
      ))}
    </ul>
  );
};
