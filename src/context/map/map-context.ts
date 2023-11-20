import { createContext } from 'react';
import { Map } from 'mapbox-gl';
import { MapboxCoords } from '../../interfaces';

interface MapContext {
  isMapReady: boolean;
  map?: Map;
  setMap: (map: Map) => void;
  getRouteDirections: (start: MapboxCoords, end: MapboxCoords) => Promise<void>;
}

export const MapContext = createContext<MapContext>({} as MapContext);
