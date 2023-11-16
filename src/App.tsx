import { MapProvider } from './context/map';
import { PlacesProvider } from './context/places';
import { HomePage } from './pages/home-page';

function App() {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomePage />
      </MapProvider>
    </PlacesProvider>
  );
}

export default App;
