import { View, Text, ActivityIndicator } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useWeather } from '@/hooks/useWearther' ;
import type { WeatherProps } from '@/types/weather';

export function Weather({ city = 'Sydney', className = '' }: WeatherProps) {
  const { data, loading, error } = useWeather(city);

  if (error) {
    return (
      <View className={`bg-[#262D40] p-4 rounded-3xl mb-8 ${className}`}>
        <Text className="text-red-400 text-center">{error}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className={`bg-accent-100 p-4 rounded-3xl mb-8 ${className}`}>
        <ActivityIndicator color="white" />
      </View>
    );
  }

  if (!data) return null;

  const temp = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h

  return (
    <View className={`bg-accent-100 p-4 rounded-3xl mb-8 px-5 py-4 ${className}`}>
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <FontAwesome5 name="cloud-sun" size={24} color="red" />
          <View className="ml-2">
            <Text className="text-black text-lg">{data.weather[0].main}</Text>
            <Text className="text-gray-400">{data.name}, {data.sys.country}</Text>
          </View>
        </View>
        <Text className="text-black text-4xl font-light">{temp}°</Text>
      </View>
      
      <View className="flex-row justify-between mt-6">
        <View>
          <Text className="text-black text-lg">{feelsLike}°C</Text>
          <Text className="text-gray-400 text-sm">Feels like</Text>
        </View>
        <View>
          <Text className="text-black text-lg">--</Text>
          <Text className="text-gray-400 text-sm">Precipitation</Text>
        </View>
        <View>
          <Text className="text-black text-lg">{humidity}%</Text>
          <Text className="text-gray-400 text-sm">Humidity</Text>
        </View>
        <View>
          <Text className="text-black text-lg">{windSpeed} km/h</Text>
          <Text className="text-gray-400 text-sm">Wind</Text>
        </View>
      </View>
    </View>
  );
}

