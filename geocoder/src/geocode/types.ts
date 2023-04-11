import { Geolocation } from 'src/entities/geolocation';

export interface IGeocodeAdapter {
  geocode: (geolocation: Geolocation) => Promise<IGeocodeResult>;
}

export interface IGeocodeResult {
  latitude: number | string;
  longitude: number | string;
}
