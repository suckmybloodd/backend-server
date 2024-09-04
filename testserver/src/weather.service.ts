import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

const cityList = [{
    "id": 524894,
    "name": "Moscow",
    "state": "",
    "country": "RU",
    "coord": {
        "lon": 37.606667,
        "lat": 55.761665
    }
}, {
    "id": 498817,
    "name": "Saint Petersburg",
    "state": "",
    "country": "RU",
    "coord": {
        "lon": 30.264168,
        "lat": 59.894444
    }
},]

function convertKelvinToCelsius(kelvin) {
    return +(kelvin - 273).toFixed(1)
}
//температура в кельвинах
//https://api.openweathermap.org/data/2.5/weather?lat=55.736646&lon=37.469800&appid=a90a1e528897aa42c7e1d73f490ed279

@Injectable()
export class WeatherService {
    cityMap = new Map()
    constructor() {
        this.getWeatherList();
        setInterval(() => {
            this.getWeatherList();
        }, 864000002);
    }

    async getWeatherList() {
        for (let i = 0; i < cityList.length; i++) {
            //const weather = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=' + cityList[i].coord.lat + '&lon=' + cityList[i].coord.lon + '&appid=a90a1e528897aa42c7e1d73f490ed279')
            try {
                const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityList[i].coord.lat}&lon=${cityList[i].coord.lon}&appid=a90a1e528897aa42c7e1d73f490ed279`)
                this.cityMap.set(cityList[i].name, weather.data)
            }
            catch (e) { }

        }
        console.log(this.cityMap.get('Moscow'))

    }
    getWeatherByCityName(cityName): {
        "main": {
            "temp": number,
            "feels_like": number,
            "temp_min": number,
            "temp_max": number,
        }
    } {
        const weather = this.cityMap.get(cityName) || {
            "main": {
                "temp": 0,
                "feels_like": 0,
                "temp_min": 0,
                "temp_max": 0,
            }
        }
        return {
            main: {
                temp: convertKelvinToCelsius(weather.main.temp),
                feels_like: convertKelvinToCelsius(weather.main.feels_like),
                temp_max: convertKelvinToCelsius(weather.main.temp_max),
                temp_min: convertKelvinToCelsius(weather.main.temp_min),
            }
        }
    }
    //console.log(course)
    //const parser = new XMLParser();
    /*let courseObject = parser.parse(course.data).ValCurs.Valute;
    for (let i = 0; i < courseObject.length; i++){
        this.courseMap.set(courseObject[i].CharCode, courseObject[i])
    }

    constructor(){
    this.getWeatherList()
    }
    */
} 