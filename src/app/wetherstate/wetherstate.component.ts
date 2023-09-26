import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoriteCitiesService, CityWeatherInfo } from '../favorite-cities.service';

@Component({
  selector: 'app-wetherstate',
  templateUrl: './wetherstate.component.html',
  styleUrls: ['./wetherstate.component.css']
})
export class WetherstateComponent implements OnInit {
  fourDayForecast: any[] = [];

  city: string = '';
  weatherData: any;
  isFahrenheit = false;
  isMetric = true;
  hourlyForecastData: any[] | undefined;
  name: any;
  favoriteCities: CityWeatherInfo[] | undefined;

  constructor(private http: HttpClient, public favoriteCitiesService: FavoriteCitiesService) {}

  ngOnInit(): void {
    this.favoriteCities = this.favoriteCitiesService.getFavoriteCities();
    console.log(this.favoriteCities);
  }
 
  getWeatherInfo() {
    return {
      name: this.weatherData.name,
      country: this.weatherData.sys.country,
      description: this.weatherData.weather[0].description,
      temperature: this.isMetric ? this.weatherData.main.temp : this.convertToFahrenheit(this.weatherData.main.temp),
      humidity: this.weatherData.main.humidity,
      windSpeed: this.isMetric ? this.weatherData.wind.speed : this.convertToMph(this.weatherData.wind.speed),
      icon: this.weatherData.weather[0].icon
    };
  }

  toggleUnit() {
    this.isFahrenheit = !this.isFahrenheit;
  }

  convertToFahrenheit(celsius: number): number {
    return (celsius * 9 / 5) + 32;
  }

  getIconUrl(iconCode: string): string {
    return `http://openweathermap.org/img/w/${iconCode}.png`;
  }

  toggleUnits() {
    this.isMetric = !this.isMetric;
  }

  convertToMph(mps: number): number {
    return mps * 2.23694;
  }

  getWeather() {
    const apiKey = '624fae2a902fc86df04d88a8adb68050';

    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${apiKey}`)
      .subscribe(
        (data: any) => {
          console.log('API Response:', data);
          this.weatherData = data;

          this.hourlyForecastData = data.list.map((entry: any) => ({
            time: entry.dt_txt.split(' ')[1],
            temp: entry.main.temp
          }));
           // Extract the next 4 days from the forecast data
        this.fourDayForecast = data.list.slice(0, 4).map((entry: any) => ({
          date: entry.dt_txt,
          temperature: entry.main.temp,
          icon: entry.weather[0].icon
        }));

          this.saveCity(); // Call saveCity here after weatherData is populated

        },
        (error) => {
          console.error('API Error:', error);
          if (error.status === 404) {
            alert('City not found. Please enter a valid city name.');
          } else {
            alert('An error occurred while fetching weather data.');
          }
        }
      );
  }

  saveCity() {
    if (this.weatherData && this.weatherData.name) {
      const cityInfo = {
        name: this.weatherData.name,
        country: this.weatherData.sys.country,
        description: this.weatherData.weather[0].description,
        temperature: this.isMetric ? this.weatherData.main.temp : this.convertToFahrenheit(this.weatherData.main.temp),
        humidity: this.weatherData.main.humidity,
        windSpeed: this.isMetric ? this.weatherData.wind.speed : this.convertToMph(this.weatherData.wind.speed),
        icon: this.weatherData.weather[0].icon
      };
  
      // Check if the city is already in the list of favorite cities
      const isCityAlreadyFavorited = this.favoriteCitiesService.getFavoriteCities().some((favoriteCity: any) => favoriteCity.name === cityInfo.name);
  
      if (!isCityAlreadyFavorited) {
        this.favoriteCitiesService.addFavoriteCity(cityInfo);
      }
    }
  }
  

  isCityFavorited(): boolean {
    if (this.weatherData && this.weatherData.name) {
      const city = this.weatherData.name;
      return this.favoriteCitiesService.getFavoriteCities().some((favoriteCity: any) => favoriteCity.name === city);
    }
    return false;
  }
}

