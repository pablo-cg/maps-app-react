import { MapState } from './map-provider';
import { Map, Marker } from 'mapbox-gl';

type SetMapAction = {
  type: 'set_map';
  payload: Map;
};

type SetMarkersAction = {
  type: 'set_markers';
  payload: Marker[];
};

type MapAction = SetMapAction | SetMarkersAction;

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case 'set_map':
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };
    case 'set_markers':
      return {
        ...state,
        markers: action.payload,
      };

    default:
      return state;
  }
};
