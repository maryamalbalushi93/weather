import { Injectable } from '@angular/core';

export interface CityWeatherInfo {
  name: any;
  country: any;
  description: any;
  windSpeed: any;
  humidity: any;
  temperature: any;
  icon: any;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteCitiesService {
  private favoriteCities: CityWeatherInfo[] = [];
  private cachedCities: { [cityName: string]: CityWeatherInfo } = {};

  constructor() {
    this.loadFavoriteCities();
  }

  private loadFavoriteCities() {
    const storedCities = localStorage.getItem('favoriteCities');
    if (storedCities) {
      this.favoriteCities = JSON.parse(storedCities);
    }
  }

  addFavoriteCity(cityInfo: CityWeatherInfo) {
    this.favoriteCities.push(cityInfo);
    this.updateLocalStorage();
  }
  
  getFavoriteCities() {
    return this.favoriteCities;
  }

  getCachedCity(cityName: string): CityWeatherInfo | undefined {
    return this.cachedCities[cityName];
  }

  cacheCity(cityName: string, cityInfo: CityWeatherInfo) {
    this.cachedCities[cityName] = cityInfo;
  }

  private updateLocalStorage() {
    localStorage.setItem('favoriteCities', JSON.stringify(this.favoriteCities));
  }

  removeFavoriteCity(index: number) {
    this.favoriteCities.splice(index, 1);
    this.updateLocalStorage();
  }  
}

