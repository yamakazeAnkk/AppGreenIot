import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';

type WaterData = {
    temperature: number;
    day: string;
  };
  
  type ChartSectionProps = {
    waterData: WaterData[];
  };
export default function ChartSection({waterData}: ChartSectionProps) {
    const screenWidth = Dimensions.get('window').width;
    return (
      <View className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <View className="flex-row items-center mb-4">
          <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-2">
            <Feather name="thermometer" size={20} color="#3B82F6" />
          </View>
          <Text className="text-lg font-semibold">Water Temperature</Text>
        </View>
        <LineChart
          data={{
            labels: waterData.map(d => d.day),
            datasets: [{ data: waterData.map(d => d.temperature) }]
          }}
          width={screenWidth - 56}
          height={180}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#3B82F6'
            }
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
        <View className="flex-row justify-between mt-2">
          <View className="items-center">
            <Text className="text-gray-500 text-sm">Average</Text>
            <Text className="text-lg font-semibold">24°C</Text>
          </View>
          <View className="items-center">
            <Text className="text-gray-500 text-sm">Optimal</Text>
            <Text className="text-lg font-semibold">23-26°C</Text>
          </View>
        </View>
      </View>
    )
}