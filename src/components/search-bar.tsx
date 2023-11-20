import { ChangeEvent, useContext, useRef } from 'react';
import { PlacesContext } from '../context/places';
import { SearchResults } from '.';

export const SearchBar = () => {
  const { searchPlacesByQuery } = useContext(PlacesContext);

  const debounceRef = useRef<NodeJS.Timeout>();

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      await searchPlacesByQuery(event.target.value);
    }, 1000);
  }

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar Lugar..."
        onChange={onInputChange}
      />
      <SearchResults />
    </div>
  );
};
