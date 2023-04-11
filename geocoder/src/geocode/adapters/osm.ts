import axios, { Axios } from 'axios';
import { IGeocodeResult, IGeocodeAdapter } from '../types';
import { Geolocation } from 'src/entities/geolocation';
import { Injectable } from '@nestjs/common';

enum Endpoint {
  SEARCH = 'search',
}

@Injectable()
export class OSMGeocodeAdapter implements IGeocodeAdapter {
  http: Axios;
  constructor() {
    this.http = axios.create({
      baseURL: 'https://nominatim.openstreetmap.org',
    });
  }
  async geocode(geolocation: Geolocation): Promise<IGeocodeResult> {
    const { data } = await this.http.get(Endpoint.SEARCH, {
      params: { ...geolocation, format: 'json' },
    });

    const { lat, lon } = data[0];

    return { latitude: lat, longitude: lon };
  }
}
