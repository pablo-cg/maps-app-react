import { useEffect, useReducer } from 'react';
import { PlacesContext } from './places-context';
import { placesReducer } from './places-reducer';
import { getLocation } from '../../helpers';
import { searchApi } from '../../api';
import { Feature, PlacesResponse } from '../../interfaces/places';

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const PlacesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getLocation().then((geolocation) =>
      dispatch({ type: 'set_location', payload: geolocation })
    );
  }, []);

  async function searchPlacesByQuery(query: string): Promise<Feature[]> {
    if (!query.trim()) return [];
    if (!state.userLocation) throw new Error('Geolocalización no disponible');

    dispatch({ type: 'set_loading_places' });

    const params = {
      proximity: state.userLocation.join(','),
    };

    const { data } = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params,
    });

    dispatch({ type: 'set_places', payload: data.features });

    return data.features;
  }

  return (
    <PlacesContext.Provider value={{ ...state, searchPlacesByQuery }}>
      {children}
    </PlacesContext.Provider>
  );
};
