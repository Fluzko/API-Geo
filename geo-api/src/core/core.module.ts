import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Geolocation } from '../entities';
import { ClientsModule } from '@nestjs/microservices';
import { getRMQConfig } from 'src/utils/RMQConfig';

@Module({
  imports: [
    TypeOrmModule.forFeature([Geolocation]),
    ClientsModule.register([{ ...getRMQConfig(), name: 'RMQ_CLIENT' }]),
  ],
  providers: [CoreService],
  controllers: [CoreController],
})
export class CoreModule {}
