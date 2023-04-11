import { Injectable } from '@nestjs/common';
import { OSMGeocodeAdapter } from './adapters/osm';
import { Geolocation } from 'src/entities/geolocation';

@Injectable()
export class GeocodeService {
  constructor(private readonly geocodeAdapter: OSMGeocodeAdapter) {}

  geocode(geolocation: Geolocation) {
    return this.geocodeAdapter.geocode(geolocation);
  }
}
