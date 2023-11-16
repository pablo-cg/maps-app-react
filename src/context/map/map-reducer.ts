import { MapState } from './map-provider';
import { Map } from 'mapbox-gl';

type MapAction = {
  type: 'set-map';
  payload: Map;
};

export const mapReducer = (state: MapState, action: MapAction): MapState => {
  switch (action.type) {
    case 'set-map':
      return {
        ...state,
        isMapReady: true,
        map: action.payload,
      };

    default:
      return state;
  }
};
