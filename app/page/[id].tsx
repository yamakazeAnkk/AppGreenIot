import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import SensorGrid from '@/components/SensorGrid';
import ToggleGrid from '@/components/ToggleGrid';
import ChartSection from '@/components/ChartSection';
import HybridSection from '@/components/HybridSection';
import { auth } from '@/firebase';

type Section = {
  title: string;
  content: string;
};

type WaterData = {
  temperature: number;
  day: string;
};

type ApiResult = {
  output_label: number[];
};

const waterData: WaterData[] = [
  { temperature: 24, day: 'Mon' },
  { temperature: 25, day: 'Tue' },
  { temperature: 23, day: 'Wed' },
  { temperature: 0, day: 'Thu' },
  { temperature: 24, day: 'Fri' },
  { temperature: 25, day: 'Sat' },
  { temperature: 23, day: 'Sun' },
];

const sections: Section[] = [
  {
    title: 'Benefit 1: Enhance Air Quality',
    content: 'Having a garden helps to purify the air by absorbing carbon dioxide and releasing oxygen, making the environment healthier to live in.',
  },
  {
    title: 'Benefit 2: Stress Relief',
    content: 'Spending time in a garden has been shown to reduce stress and improve mental well-being by allowing individuals to connect with nature.',
  },
  {
    title: 'Benefit 3: Promote Biodiversity',
    content: 'A garden can become a habitat for various species, including birds, insects, and small mammals, helping to increase biodiversity in urban areas.',
  },
  {
    title: 'Benefit 4: Improve Property Value',
    content: 'A well-maintained garden can significantly enhance the aesthetic appeal of your property and even increase its market value.',
  },
];


export default function GuideDetail() {
  const router = useRouter();
  const { id, image, name } = useLocalSearchParams();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [isChartExpanded, setIsChartExpanded] = useState(false);
  const [isHotSeed, setIsHotSeed] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const currentUser = auth.currentUser;
  const userId = currentUser?.uid;
  const [selectedTab, setSelectedTab] = useState<'SensorGrid' | 'Toggle' | 'Chart' | 'Hybrid'>('SensorGrid');
  const [apiResult, setApiResult] = useState<ApiResult | null>(null);  // Type the API result
  console.log(image);

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const toggleChart = () => {
    setIsChartExpanded(!isChartExpanded);
  };

  const toggleHotSeed = () => {
    setIsHotSeed(!isHotSeed);
  };

  // Fetch API result
  const fetchApiResult = async () => {
    try {
      // Fetch the sensor data
      const sensorResponse = await fetch(`http://localhost:8080/api/sensor-data/${id}/latest`);
      
      const sensorData = await sensorResponse.json();
  
      // Extract values from sensor data and prepare them in the required format
      const sensorValues = [
        sensorData.temperature, 
        sensorData.humidity, 
        sensorData.soilMoisture, 
        sensorData.lightLevel, 
        sensorData.coPpm, 
        sensorData.isRaining
      ];
  
      // Send this data to the AI API
      const response = await fetch('http://localhost:8080/api/Ai/predict', {
        method: 'POST',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([sensorValues]),  // Send the sensor data as the body
      });
  
      const data = await response.json();
      setApiResult(data);  // Set the API result to state
    } catch (error) {
      console.error('Error fetching API result:', error);
      setApiResult(null);  // Set to null in case of an error
    }
  };
  
  useEffect(() => {
    fetchApiResult();  // Call the API on mount
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <AntDesign name="left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-medium mr-8">{name}</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Plant Image */}
        <View className="relative">
          <Image
            source={{ uri: image as string }}
            className="w-full h-80"
            resizeMode="contain"
          />
          {apiResult && apiResult.output_label && apiResult.output_label[0] !== undefined && (
            <View className="absolute bottom-4 right-4 p-2 bg-opacity-50 bg-black rounded-full">
              {apiResult.output_label[0] === 0 ? (
                <Text className="text-white">Không cần tưới nước</Text>
              ) : (
                <Text className="text-white">Cần tưới nước</Text>
              )}
            </View>
          )}
        </View>

        

        {/* Display API result */}
        
        <View className="px-4 mt-4">
          {/* Tab Buttons */}
          <View className="flex-row flex-wrap gap-2">
            <TouchableOpacity
              onPress={() => setSelectedTab('SensorGrid')}
              className="bg-[#4A6741] px-3 py-1 rounded-full"
            >
              <Text className="text-white">Data</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('Toggle')}
              className="bg-[#4A6741] px-3 py-1 rounded-full"
            >
              <Text className="text-white">Controller</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={() => setSelectedTab('Chart')}
              className="bg-[#4A6741] px-3 py-1 rounded-full"
            >
              <Text className="text-white">Chart</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => setSelectedTab('Hybrid')}
              className="bg-[#4A6741] px-3 py-1 rounded-full"
            >
              <Text className="text-white">Hybrid</Text>
            </TouchableOpacity>
          </View>

          {/* Render the selected component */}
          <View className="mt-4">
            {selectedTab === 'SensorGrid' && <SensorGrid />}
            {selectedTab === 'Toggle' && <ToggleGrid />}
            {selectedTab === 'Chart' && <ChartSection waterData={waterData} />}
            {selectedTab === 'Hybrid' && <HybridSection sections={sections} />}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
