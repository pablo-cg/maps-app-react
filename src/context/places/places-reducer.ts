import { MapboxCoords } from '../../interfaces';
import { Feature } from '../../interfaces/places';
import { PlacesState } from './places-provider';

type SetLoadingAction = {
  type: 'set_loading_places';
};

type SetLocationAction = {
  type: 'set_location';
  payload: MapboxCoords;
};

type SetPlacesAction = {
  type: 'set_places';
  payload: Feature[];
};

type PlacesAction = SetLocationAction | SetPlacesAction | SetLoadingAction;

export const placesReducer = (
  state: PlacesState,
  action: PlacesAction
): PlacesState => {
  switch (action.type) {
    case 'set_location':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload,
      };
    case 'set_loading_places':
      return {
        ...state,
        isLoadingPlaces: true,
        places: [],
      };
    case 'set_places':
      return {
        ...state,
        places: action.payload,
        isLoadingPlaces: false,
      };

    default:
      return state;
  }
};
