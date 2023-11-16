import { createContext } from 'react';

export interface PlacesContext {
  isLoading: boolean;
  userLocation?: [number, number];
}

export const PlacesContext = createContext<PlacesContext>({} as PlacesContext);
