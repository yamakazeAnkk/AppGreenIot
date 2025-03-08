import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ToggleCard from './ToggleCard';  // Ensure the path to ToggleCard is correct
import icons from '@/constants/icons'; // Assuming you have icons in this path
import { useRoute } from '@react-navigation/native';

interface ToggleItem {
  title: string;
  icon: React.ReactNode;
  slug: string;
  isActive?: boolean;
}

export default function ToggleGrid() {
  const route = useRoute();
  const { id } = route.params as { id: string };

  const [isLoading, setIsLoading] = useState(true);
  const [toggleItems, setToggleItems] = useState<ToggleItem[]>([
    { title: 'Fan', icon: icons.fan, slug: 'fan' },
    { title: 'Water Pump', icon: icons.waterPump, slug: 'pump' },
    { title: 'Canopy', icon: icons.homeRoof, slug: 'canopy' },
    { title: 'Settings', icon: icons.settingsSuggest, slug: 'state' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://0.0.0.0:8080/api/devices/getData/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        const data = await response.json();
        if (!data || Object.keys(data).length === 0) {
          setToggleItems([]);
          return;
        }
        const updatedItems = toggleItems.map((item) => ({
          ...item,
          isActive: data[item.slug] === 1,
        }));
        setToggleItems(updatedItems);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleToggle = async (slug: string, isActive: boolean) => {
    const newStatus = isActive ? 0 : 1;
    const updatedItems = toggleItems.map((item) =>
      item.slug === slug ? { ...item, isActive: newStatus === 1 } : item
    );
    setToggleItems(updatedItems);

    const updatedData = {
      canopy: toggleItems.find(item => item.slug === 'canopy')?.isActive ? 1 : 0,
      fan: toggleItems.find(item => item.slug === 'fan')?.isActive ? 1 : 0,
      pump: toggleItems.find(item => item.slug === 'pump')?.isActive ? 1 : 0,
      state: toggleItems.find(item => item.slug === 'state')?.isActive ? 1 : 0,
    };
    updatedData[slug as keyof typeof updatedData] = newStatus;

    try {
      const response = await fetch(`http://0.0.0.0:8080/api/devices/updateData/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        },
        body: JSON.stringify(updatedData),
      });
      if (!response.ok) {
        throw new Error(`Failed to update data. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('State updated successfully', data);
    } catch (error) {
      console.error('Error updating state:', error);
    }
  };

  if (isLoading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (toggleItems.length === 0) {
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
        {toggleItems.map((item, index) => (
          <View key={index} className="w-[48%] mb-4 border-none rounded-3xl">
            <ToggleCard
              title={item.title}
              icon={item.icon}
              slug={item.slug}
              isActive={Boolean(item.isActive)}
              onToggle={() => handleToggle(item.slug, Boolean(item.isActive))}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
