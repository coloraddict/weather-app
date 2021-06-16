import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from '../shared/services/weather-forecast.service';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {

  cities: any = [];
  weatherReport:any = [];
  defaultCity: any = [];
  citiesWeatherList: any = [];
  display = "none";
  forecast_list:any = [];
  cityName: string = "";

  constructor(public weatherService: WeatherForecastService) { }

  ngOnInit(): void {
    this.cities = this.weatherService.getCities();
    // console.log(this.cities);
    this.defaultCity = this.cities[0];
    this.loadWeather(this.defaultCity.city, 0);
    this.loadWeatherForAllCities();
  }

  loadWeather(city, index){  
    this.weatherService.getWeather(city).subscribe(report => {
      this.weatherReport = report;
      this.defaultCity = this.cities[index];
      // console.log(this.weatherReport);
    })     
  }

  loadWeatherForAllCities(){
    for(let i=0; i<this.cities.length; i++) {
      this.weatherService.getWeather(this.cities[i].city).subscribe(response => {        
        this.weatherReport = response;
        response["timezone_txt"] = this.cities[i].timezone;
        this.citiesWeatherList.push(response);
        
        // console.log(this.citiesWeatherList);
      })     
    }
  }

  showForecast(oCity){
    // console.log(oCity.timezone_txt);
    this.cityName = oCity.name;
     this.weatherService.getForecast(oCity.coord.lat, oCity.coord.lon).subscribe(res => {
      this.forecast_list = [];
      this.forecast_list = res["list"].filter(item => {
        var str = item.dt_txt;
        var spl = str.split(" ");
        if(spl[1] === "09:00:00") {
          // console.log(item);
          return item;
        }
      })
      this.openModal();
    })
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

}
