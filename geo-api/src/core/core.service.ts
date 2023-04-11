import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Geolocation } from '../entities';

enum GeolocationState {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

@Injectable()
export class CoreService {
  constructor(
    @InjectRepository(Geolocation)
    private geolocationRepository: Repository<Geolocation>,
  ) {}

  async createGeolocation(geolocation: Geolocation): Promise<Geolocation> {
    return this.geolocationRepository.save(geolocation);
  }

  async geocode(id: number): Promise<IGeocodedLocation> {
    const geolocation = await this.geolocationRepository.findOneBy({
      id,
    });

    if (!geolocation) throw new BadRequestException('Invalid ID');

    const { latitude, longitude } = geolocation;

    if (!latitude && !longitude) {
      return { id, state: GeolocationState.PENDING };
    }

    return {
      id,
      state: GeolocationState.SUCCESS,
      latitude,
      longitude,
    };
  }

  async updateGeocoding(geocodeResult: IGeocodeResult) {
    const { id, latitude, longitude } = geocodeResult;
    const { affected, raw } = await this.geolocationRepository.update(id, { latitude, longitude });
    console.log(id, latitude, longitude, affected, raw);

    // return this.geolocationRepository
    //   .createQueryBuilder()
    //   .update()
    //   .set({ latitude, longitude })
    //   .where({ id })
    //   .execute();
  }
}
