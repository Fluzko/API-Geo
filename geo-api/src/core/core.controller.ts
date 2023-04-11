import { Body, Controller, Get, Inject, ParseIntPipe, Post, Query, UsePipes } from '@nestjs/common';
import { CoreService } from './core.service';
import { GeolocateSchema } from './schemas/geolocate.schema';
import { JoiValidationPipe } from './../utils/joiValidationPipe';
import { Geolocation } from '../entities/geolocation';
import { ClientProxy, Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

enum QueueEvent {
  REQUEST = 'geocode.request',
  RESPONSE = 'geocode.response',
}

@Controller('')
export class CoreController {
  constructor(private coreService: CoreService, @Inject('RMQ_CLIENT') private queueService: ClientProxy) {}

  @Post('/geolocate')
  @UsePipes(new JoiValidationPipe(GeolocateSchema))
  async geolocate(@Body() geolocation: Geolocation): Promise<IGeolocationResponse> {
    const newGeolocation = await this.coreService.createGeolocation(geolocation);

    // https://rxjs.dev/deprecations/to-promise
    await firstValueFrom(this.queueService.emit(QueueEvent.REQUEST, newGeolocation));

    return { id: newGeolocation.id };
  }

  @Get('/geocode')
  geocode(@Query('id', ParseIntPipe) id: number): Promise<IGeocodedLocation> {
    return this.coreService.geocode(id);
  }

  @EventPattern(QueueEvent.RESPONSE)
  async geocodeFinishedWorker(@Payload() geocodeResult: IGeocodeResult) {
    await this.coreService.updateGeocoding(geocodeResult);
    // this.ack(context);
  }

  private ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
