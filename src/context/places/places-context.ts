import { createContext } from 'react';
import { Feature } from '../../interfaces/places';
import { MapboxCoords } from '../../interfaces';

export interface PlacesContext {
  isLoading: boolean;
  isLoadingPlaces: boolean;
  places: Feature[];
  userLocation?: MapboxCoords;

  searchPlacesByQuery: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlacesContext>({} as PlacesContext);
