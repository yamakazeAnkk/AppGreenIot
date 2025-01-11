import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LineChart } from 'react-native-chart-kit';
import { AntDesign, Feather } from '@expo/vector-icons';

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
  const { slug } = useLocalSearchParams();
  const [expandedSection, setExpandedSection] = useState<number | null>(null);
  const [isChartExpanded, setIsChartExpanded] = useState(false);
  const [isHotSeed, setIsHotSeed] = useState(false);
  const screenWidth = Dimensions.get('window').width;

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
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-2"
        >
          <AntDesign name="left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-medium mr-8">
          Black Panse
        </Text>
      </View>

      <ScrollView className="flex-1">
        {/* Plant Image */}
        <Image
          source={require('@/assets/images/frame.png')}
          className="w-full h-80"
          resizeMode="contain"
        />

        {/* Tags and Chart */}
        <View className="px-4 mt-4">
          <View className="flex-row flex-wrap gap-2">
            <TouchableOpacity 
              onPress={toggleChart}
              className="bg-[#4A6741] px-3 py-1 rounded-full"
            >
              <Text className="text-white">Hot giống</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={toggleHotSeed}
              className="bg-[#4A6741] px-3 py-1 rounded-full"
            >
              <Text className="text-white">Hybrid</Text>
            </TouchableOpacity>
          </View>

          {isChartExpanded && (
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
                  datasets: [{
                    data: waterData.map(d => d.temperature)
                  }]
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
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#3B82F6'
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
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
          )}
        </View>
        
        {/* Basic Knowledge */}     
        {isHotSeed && (
          <View className="p-4">
            <Text className="text-xl font-semibold mb-4">Basic Knowledge</Text>
          {sections.map((section, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleSection(index)}
              className="border-b border-gray-200 py-4"
            >
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-medium flex-1">
                  {section.title}
                </Text>
                {expandedSection === index ? (
                  <AntDesign name="up" size={20} color="#000" />
                ) : (
                  <AntDesign name="down" size={20} color="#000" />
                )}
              </View>
              {expandedSection === index && (
                <Text className="mt-2 text-gray-600">
                  {section.content}
                </Text>
              )}
            </TouchableOpacity>
          ))}

          {/* Plant Care Information */}
          <View className="mt-4 space-y-4">
            <View>
              <Text className="font-medium mb-1">Light:</Text>
              <Text className="text-gray-600">
                Orchid grass belongs to the group of plants that prefer bright or partially shaded light. Natural light can be used, but the plant will burn in directly planted sunlight.
              </Text>
            </View>

            <View>
              <Text className="font-medium mb-1">Soil:</Text>
              <Text className="text-gray-600">
                Ensure the soil has good drainage.
              </Text>
            </View>

            <View>
              <Text className="font-medium mb-1">Water:</Text>
              <Text className="text-gray-600">
                Distilled water or rainwater can be used, avoid using hard water. Water regularly, keeping the soil moist but not soggy.
              </Text>
            </View>

            <View>
              <Text className="font-medium mb-1">Temperature:</Text>
              <Text className="text-gray-600">
                Orchid grass thrives well at an optimal temperature range.
              </Text>
            </View>
          </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

