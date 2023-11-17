import { createContext } from 'react';
import { Feature } from '../../interfaces/places';

export interface PlacesContext {
  isLoading: boolean;
  isLoadingPlaces: boolean;
  places: Feature[];
  userLocation?: [number, number];

  searchPlacesByQuery: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlacesContext>({} as PlacesContext);
