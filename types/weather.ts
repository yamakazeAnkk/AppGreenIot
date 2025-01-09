export interface WeatherData {
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
    }>;
    wind: {
      speed: number;
    };
    name: string;
    sys: {
      country: string;
    };
  }
  
  export interface WeatherProps {
    city?: string;
    className?: string;
  }