import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import ToggleCard from './ToggleCard';  // Make sure the path to ToggleCard is correct
import icons from '@/constants/icons'; // Assuming you have icons in this path

interface ToggleItem {
  title: string;
  icon: React.ReactNode;
  slug: string;
  isActive: boolean;
}

export default function ToggleGrid() {
  const [toggleItems, setToggleItems] = useState<ToggleItem[]>([
    { title: 'Sensor 1', icon: icons.fan, slug: 'sensor1', isActive: false },
    { title: 'Sensor 2', icon: icons.waterPump, slug: 'sensor2', isActive: true },
    { title: 'Sensor 3', icon: icons.homeRoof, slug: 'sensor3', isActive: true },
    { title: 'Sensor 4', icon: icons.settingsSuggest, slug: 'sensor4', isActive: true },
    // Add more toggle items as needed
  ]);

  const handleToggle = (index: number) => {
    const updatedItems = [...toggleItems];
    updatedItems[index].isActive = !updatedItems[index].isActive;
    setToggleItems(updatedItems);
  };

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
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
