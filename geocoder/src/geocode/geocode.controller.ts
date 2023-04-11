import {
  ClientProxy,
  EventPattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { GeocodeService } from './geocode.service';
import { Controller, Inject } from '@nestjs/common';
import { Geolocation } from 'src/entities/geolocation';
import { GeolocationSchema } from './schemas/geolocation.schema';
import { JoiValidationPipe } from 'src/utils/joiValidationPipe';

enum QueueEvent {
  REQUEST = 'geocode.request',
  RESPONSE = 'geocode.response',
}

@Controller('geocode')
export class GeocodeController {
  constructor(
    private geocodeService: GeocodeService,
    @Inject('RMQ_CLIENT') private queueClient: ClientProxy,
  ) {}

  @EventPattern(QueueEvent.REQUEST)
  async handleGeocode(@Payload() geolocation: Geolocation) {
    geolocation = new JoiValidationPipe(GeolocationSchema).transform(
      geolocation,
    );
    const geocoded = await this.geocodeService.geocode(geolocation);

    await this.queueClient
      .emit(QueueEvent.RESPONSE, {
        id: geolocation.id,
        ...geocoded,
      })
      .toPromise();
  }

  private ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
