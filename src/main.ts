import './style.css';
import { getCityCoordinates, getWeatherData } from './services/api';
import { getWeatherDescription } from './utils/weatherCodes';

const searchForm = document.getElementById('search-form') as HTMLFormElement;
const cityInput = document.getElementById('city-input') as HTMLInputElement;

const emptyState = document.getElementById('empty-state') as HTMLDivElement;
const loadingState = document.getElementById('loading-state') as HTMLDivElement;
const weatherCard = document.getElementById('weather-card') as HTMLDivElement;

// At startup, hide loading and weather card, show empty state
window.addEventListener('DOMContentLoaded', () => {
  emptyState.classList.remove('hidden');
  loadingState.classList.add('hidden');
  weatherCard.classList.add('hidden');
});

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const cityName = cityInput.value.trim();
  
  if (!cityName) return;

  // Show loading
  emptyState.classList.add('hidden');
  weatherCard.classList.add('hidden');
  loadingState.classList.remove('hidden');

  const cityData = await getCityCoordinates(cityName);

  if (!cityData) {
    showEmptyState();
    return;
  }

  const weatherData = await getWeatherData(cityData.latitude, cityData.longitude, cityData.timezone);

  if (!weatherData) {
    showEmptyState();
    return;
  }

  updateDOM(cityData, weatherData);
});

function showEmptyState() {
  loadingState.classList.add('hidden');
  weatherCard.classList.add('hidden');
  emptyState.classList.remove('hidden');
}

function updateDOM(cityData: any, weatherData: any) {
  const current = weatherData.current;
  const units = weatherData.current_units;

  // Sidebar elements
  const tempEl = document.querySelector('.temperature') as HTMLElement;
  const cityEl = document.querySelector('.city') as HTMLElement;
  const dateEl = document.querySelector('.date') as HTMLElement;
  const dayNightEl = document.querySelector('.day-night') as HTMLElement;
  const weatherDescEl = document.querySelector('.weather-code') as HTMLElement;

  tempEl.textContent = `${Math.round(current.temperature_2m)}${units.temperature_2m}`;
  cityEl.textContent = `${cityData.name}, ${cityData.country_code}`;
  
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'short' };
  let formattedDate = date.toLocaleDateString('pt-BR', options);
  // Capitalize first letter
  formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  dateEl.textContent = formattedDate;

  dayNightEl.textContent = current.is_day === 1 ? 'Dia ☀️' : 'Noite 🌙';
  weatherDescEl.textContent = getWeatherDescription(current.weather_code);

  // Main details elements
  const detailValues = document.querySelectorAll('.detail-value');
  
  // Humidity
  detailValues[0].textContent = `${current.relative_humidity_2m}${units.relative_humidity_2m}`;
  
  // Apparent temperature
  detailValues[1].textContent = `${Math.round(current.apparent_temperature)}${units.apparent_temperature}`;
  
  // Precipitation probability
  detailValues[2].textContent = `${current.precipitation_probability}${units.precipitation_probability}`;
  
  // Wind
  detailValues[3].textContent = `${current.wind_speed_10m} ${units.wind_speed_10m} (${current.wind_direction_10m}${units.wind_direction_10m})`;

  // Display card
  loadingState.classList.add('hidden');
  emptyState.classList.add('hidden');
  weatherCard.classList.remove('hidden');
}
