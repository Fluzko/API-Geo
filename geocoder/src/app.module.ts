import { Module } from '@nestjs/common';
import { GeocodeModule } from './geocode/geocode.module';

@Module({
  imports: [GeocodeModule],
})
export class AppModule {}
