import { MapView, MyLocationButton, SearchBar } from '../components';

export const HomePage = () => {
  return (
    <div>
      <MapView />
      <MyLocationButton />
      <SearchBar />
    </div>
  );
};
