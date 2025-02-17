import React, { Component } from 'react'
import { Text, View } from 'react-native'

type SensorData = {
    CoPpm: string;
    Humidity: string;
    IsRaining: string;
    LightLevel: string;
    SoilMoisture: string;
    Temperature: string;
}
type SensorDataDisplayProps = {
    data : SensorData;
};

export default function SensorDataDisplay({data}: SensorDataDisplayProps) {
  return (
    <View>
    <Text className="text-xl font-bold">CoPpm: {String(data.CoPpm)}</Text>
    <Text className="text-xl">Humidity: {String(data.Humidity)}</Text>
    <Text className="text-xl">IsRaining: {String(data.IsRaining)}</Text>
    <Text className="text-xl">LightLevel: {String(data.LightLevel)}</Text>
    <Text className="text-xl">SoilMoisture: {String(data.SoilMoisture)}</Text>
    <Text className="text-xl">Temperature: {String(data.Temperature)}</Text>
    </View>
  )
}
