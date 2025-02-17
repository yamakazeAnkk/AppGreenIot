import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import SensorCard from './SensorCard';
import { sensor } from '@/data/data';

interface SensorData {
  CoPpm: string;
  Humidity: string;
  IsRaining: string;
  LightLevel: string;
  SoilMoisture: string;
  Temperature: string;
}
const INTERVAL_TIME = 600000;
export default function SensorGrid() {
  const route = useRoute();
  
  // Use destructuring to get the correct params
  const { id } = route.params as { id: string };

  // Log to check if data is being received properly


  const[sensorData, setSensorData] = useState<SensorData | null>(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSensorData() {
      if (!id) {
        console.error("Không có locationId trong route params");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:8080/api/sensor-data/${id}/latest`,
          {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu sensor');
        }

        const data = await response.json();
        const mappedData: SensorData = {
          CoPpm: data.coPpm,
          Humidity: data.humidity,
          IsRaining: data.isRaining === 1 ? 'Yes' : 'No',
          LightLevel: data.lightLevel,
          SoilMoisture: data.soilMoisture,
          Temperature: data.temperature,
        };
        setSensorData(mappedData);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSensorData();
    const interval = setInterval(fetchSensorData, INTERVAL_TIME);
    return () => clearInterval(interval);
  }, [id]);
  useEffect(() => {
    console.log("Fetched sensor data:", sensorData);
  }, [sensorData]);
  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!sensorData) {
    return (
      <View className='flex-1 justify-center items-center'>
        <Text>Không có dữ liệu sensor</Text>
      </View>
    );
  }
  return (
    <ScrollView 
      className="bg-gray-100"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row flex-wrap justify-between pt-4">
        {sensor.map((item, index) => (
          <View key={index} className="w-[48%] mb-4 border-none rounded-3xl">
            <SensorCard 
              icon={item.icon} 
              title={item.title} 
              slug={item.slug}
              value={sensorData ? sensorData[item.key as keyof typeof sensorData] : ''}
              id={id}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
