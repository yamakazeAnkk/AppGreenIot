import { useState, useEffect } from 'react';
import { WeatherData } from '@/types/weather';

const API_KEY = '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export function useWeather(city: string = 'Sydney') {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Weather data not available');
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch: fetchWeather };
}

