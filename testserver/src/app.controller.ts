import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheService } from './cache.service';
import { WeatherService } from './weather.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    private readonly cacheService: CacheService, 
    private readonly weatherService: WeatherService
  ) { }

  @Get()
  getHello(): string {
    const currentDate = new Date();
    
    const weatherMoscow = this.weatherService.getWeatherByCityName('Moscow');
    
    return `
    Текущая дата: ${currentDate.toDateString()} <br>
    Курс доллара: ${this.cacheService.getCourseByCharCode('USD').Value} <br>
    Курс евро: ${this.cacheService.getCourseByCharCode('EUR').Value} <br>
    Температура: ${weatherMoscow.main.temp} <br>
    Ощущается как: ${weatherMoscow.main.feels_like} <br>
    Макс Температура: ${weatherMoscow.main.temp_max} <br>
    Мин Температура: ${weatherMoscow.main.temp_min}<br>
    `;
  }
}