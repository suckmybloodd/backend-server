import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheService } from './cache.service';
import { WeatherService } from './weather.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CacheService, WeatherService],
})
export class AppModule {}