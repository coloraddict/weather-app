import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  cities: any[] = [
    { city: "Mumbai", country: "India", timezone: "Asia/Kolkata" },
    { city: "London", country: "United Kingdom", timezone: "Europe/London" },
    { city: "Berlin", country: "Germany", timezone: "Europe/Berlin" },
    { city: "Madrid", country: "Spain", timezone: "Europe/Madrid" },
    { city: "Istanbul", country: "Turkey", timezone: "Europe/Istanbul" },
    { city: "Moscow", country: "Russia", timezone: "Europe/Moscow" },
  ]

  constructor(public http: HttpClient) { }

  getCities(){
    return this.cities;
  }

  getWeather(city){
    // console.log(city);
    return this.http.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=a50a790c1717bcbc09c88e191997fe3f&units=metric");
  }

  getForecast(p_lat, p_lon){
    return this.http.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + p_lat + "&lon=" + p_lon + "&appid=a50a790c1717bcbc09c88e191997fe3f&units=metric");
  }
}
