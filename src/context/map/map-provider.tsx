import { useReducer } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from '.';
import { mapReducer } from './map-reducer';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  function setMap(map: Map) {
    const locationPopup = new Popup().setHTML(`
        <h5>Aquí Estoy</h5>
        <p>En algún lugar del Mundo</p>
    `);

    new Marker({
      color: '#a40000',
    })
      .setLngLat(map.getCenter())
      .setPopup(locationPopup)
      .addTo(map);

    dispatch({ type: 'set-map', payload: map });
  }

  return (
    <MapContext.Provider value={{ ...state, setMap }}>
      {children}
    </MapContext.Provider>
  );
};
