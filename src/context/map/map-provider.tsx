import { useContext, useEffect, useReducer } from 'react';
import {
  AnySourceData,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { directionsApi } from '../../api';
import { DirectionsResponse } from '../../interfaces/directions';
import { MapboxCoords } from '../../interfaces';
import { MapContext } from '.';
import { mapReducer } from './map-reducer';
import { PlacesContext } from '../places';

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    if (!places.length && state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map?.removeSource('RouteString');
    }

    state.markers.forEach((marker) => marker.remove());

    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [longitude, latitude] = place.center;

      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
      `);

      const newMarker = new Marker()
        .setPopup(popup)
        .setLngLat([longitude, latitude])
        .addTo(state.map!);

      newMarkers.push(newMarker);
    }

    dispatch({ type: 'set_markers', payload: newMarkers });
  }, [places]);

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

    dispatch({ type: 'set_map', payload: map });
  }

  async function getRouteDirections(start: MapboxCoords, end: MapboxCoords) {
    const { data } = await directionsApi.get<DirectionsResponse>(
      `/${start.join(',')};${end.join(',')}`
    );

    const { coordinates } = data.routes[0].geometry;

    const bounds = new LngLatBounds(start, start);

    for (const coord of coordinates) {
      const newCoord = [coord[0], coord[1]] as LngLatLike;

      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 100,
    });

    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map?.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData);

    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'white',
        'line-width': 3,
      },
    });
  }

  return (
    <MapContext.Provider value={{ ...state, setMap, getRouteDirections }}>
      {children}
    </MapContext.Provider>
  );
};
