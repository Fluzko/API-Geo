interface IGeolocationResponse {
  id: number;
}

interface IGeocodedLocation {
  id: number;
  latitude?: string;
  longitude?: string;
  state: GeolocationState;
}

interface IGeocodeResult {
  id: number;
  latitude: string;
  longitude: string;
}
