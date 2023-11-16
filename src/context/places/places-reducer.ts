import { PlacesState } from './places-provider';

type PlacesAction = {
  type: 'set_location';
  payload: [number, number];
};

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

    default:
      return state;
  }
};
