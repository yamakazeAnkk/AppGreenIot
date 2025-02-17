import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { AntDesign, Feather } from '@expo/vector-icons';
import ChartSection from '@/components/ChartSection';
import HybridSection from '@/components/HybridSection';
import SensorGrid from '@/components/SensorGrid';
import ToggleGrid from '@/components/ToggleGrid';
type Section = {
  title: string;  
  content: string;
};

type WaterData = {
  temperature: number;
  day: string;
};

const waterData: WaterData[] = [
  { temperature: 24, day: 'Mon' },
  { temperature: 25, day: 'Tue' },
  { temperature: 23, day: 'Wed' },
  { temperature: 26, day: 'Thu' },
  { temperature: 24, day: 'Fri' },
  { temperature: 25, day: 'Sat' },
  { temperature: 23, day: 'Sun' },
];

const sections: Section[] = [
  {
    title: 'Step 1: Prepare all tools and seeds',
    content: 'Gather all necessary gardening tools and ensure seeds are ready for planting.'
  },
  {
    title: 'Step 2: Seeding',
    content: 'Plant the seeds at the appropriate depth and spacing.'
  }
];

export default function GuideDetail() {
  const router = useRouter();
  const { id , image , name } = useLocalSearchParams();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [isChartExpanded, setIsChartExpanded] = useState(false);
  const [isHotSeed, setIsHotSeed] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const [selectedTab, setSelectedTab] = useState<'SensorGrid' | 'Toggle' | 'Chart' | 'Hybrid'>('SensorGrid');


  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const toggleChart = () => {
    setIsChartExpanded(!isChartExpanded);
  };

  const toggleHotSeed = () => {
    setIsHotSeed(!isHotSeed);
  };

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
        <Image
          source={{ uri: image as string }}
          className="w-full h-80"
          resizeMode="contain"
        />
        <View className="px-4 mt-4">
          <View className="flex-row flex-wrap gap-2">
            <TouchableOpacity
              onPress={() => setSelectedTab('SensorGrid')}
              className="bg-[#4A6741] px-3 py-1 rounded-full"
            >
              <Text className="text-white">SensorGrid</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSelectedTab('Toggle')}
              className="bg-[#4A6741] px-3 py-1 rounded-full"
            >
              <Text className="text-white">Toggle</Text>
            </TouchableOpacity> 
            <TouchableOpacity
              onPress={() => setSelectedTab('Chart')}
              className="bg-[#4A6741] px-3 py-1 rounded-full"
            >
              <Text className="text-white">Chart</Text>
            </TouchableOpacity>
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

