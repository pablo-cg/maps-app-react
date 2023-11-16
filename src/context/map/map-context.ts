import { createContext } from 'react';
import { Map } from 'mapbox-gl';

interface MapContext {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
}

export const MapContext = createContext<MapContext>({} as MapContext);
