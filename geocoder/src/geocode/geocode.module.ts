import { Module } from '@nestjs/common';
import { GeocodeController } from './geocode.controller';
import { GeocodeService } from './geocode.service';
import { OSMGeocodeAdapter } from './adapters/osm';
import { getRMQConfig } from 'src/utils/RMQConfig';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{ ...getRMQConfig(), name: 'RMQ_CLIENT' }]),
  ],
  controllers: [GeocodeController],
  providers: [GeocodeService, OSMGeocodeAdapter],
})
export class GeocodeModule {}
