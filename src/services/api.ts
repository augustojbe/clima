export interface CityCoordinates {
  name: string;
  latitude: number;
  longitude: number;
  country_code: string;
  timezone: string;
}

export interface WeatherData {
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    is_day: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    precipitation_probability: string;
    weather_code: string;
  };
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    is_day: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    precipitation_probability: number;
    weather_code: number;
  };
}

export async function getCityCoordinates(cityName: string): Promise<CityCoordinates | null> {
  if (!cityName) return null;

  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=pt&format=json`
    );
    if (!response.ok) return null;

    const data = await response.json();
    if (!data.results || data.results.length === 0) return null;

    const result = data.results[0];
    return {
      name: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      country_code: result.country_code,
      timezone: result.timezone || 'GMT',
    };
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    return null;
  }
}

export async function getWeatherData(latitude: number, longitude: number, timezone: string): Promise<WeatherData | null> {
  if (latitude === undefined || longitude === undefined || !timezone) return null;

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=precipitation_probability,temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,precipitation,weather_code&timezone=${encodeURIComponent(timezone)}`
    );
    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}
