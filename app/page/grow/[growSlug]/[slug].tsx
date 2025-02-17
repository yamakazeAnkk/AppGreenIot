import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import CoPpmChart from '@/components/CoPpmChart'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import IsRainingChart from '@/components/IsRainingChart'
import SoilMoistureChart from '@/components/SoilMoistureChart'
import LightLevelChart from '@/components/LightLevelChart'
import HumidityChart from '@/components/HumidityChart'
import TemperatureChart from '@/components/TemperatureChart'
export default function ChartPage() {
    const {chart, id} = useLocalSearchParams<{chart: string, id: string}>()
    const router = useRouter()
    const renderChart = () => {
        console.log("chart:", chart);
        console.log("id:", id);
        const sensorKey = chart?.toLowerCase();
        switch(sensorKey) {
          case 'wind':
            return <CoPpmChart id={id} chart={chart} />;
          case 'water':
            return <IsRainingChart id={id} chart={chart} />;
          case 'leaf':
            return <SoilMoistureChart id={id} chart={chart} />;
          case 'light':
            return <LightLevelChart id={id} chart={chart} />;
          case 'humidity':
            return <HumidityChart id={id} chart={chart} />;
          case 'temperature':
            return <TemperatureChart id={id} chart={chart} />;
          default:
            return <Text>Chart not found</Text>;
        }
      };
  return (
    <SafeAreaView>
      <View className='flex-row items-center p-4 border-b border-gray-200'>
        <TouchableOpacity onPress={() => router.back()} className='p-2'>
          <AntDesign name="left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className='flex-1 text-center text-lg font-medium mr-8'>{chart}</Text>
      </View>
        <ScrollView
            contentContainerStyle={{
                padding: 16,
            }}
        >
            
            {renderChart()}
        </ScrollView>
    </SafeAreaView>
  )
}