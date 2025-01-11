import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

type Notification = {
  id: string;
  plantName: string;
  temperature: number;
  previousTemperature: number;
  timestamp: string;
};

const mockNotifications: Notification[] = [
  { id: '1', plantName: 'Black Panse', temperature: 26, previousTemperature: 24, timestamp: '2 hours ago' },
  { id: '2', plantName: 'Orchid', temperature: 22, previousTemperature: 25, timestamp: '4 hours ago' },
  { id: '3', plantName: 'Succulent', temperature: 28, previousTemperature: 26, timestamp: '1 day ago' },
  { id: '4', plantName: 'Fern', temperature: 23, previousTemperature: 22, timestamp: '2 days ago' },
];

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const renderNotificationCard = (notification: Notification) => {
    const temperatureDiff = notification.temperature - notification.previousTemperature;
    const isIncreased = temperatureDiff > 0;

    return (
      <TouchableOpacity
        key={notification.id}
        className="bg-white rounded-xl p-4 mb-4"
      >
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Feather name="thermometer" size={24} color="#3B82F6" />
            </View>
            <View>
              <Text className="font-semibold text-lg">{notification.plantName}</Text>
              <Text className="text-gray-500">{notification.timestamp}</Text>
            </View>
          </View>
          <View className={`flex-row items-center ${isIncreased ? 'bg-red-100' : 'bg-green-100'} px-2 py-1 rounded-full`}>
            {isIncreased ? (
              <Feather name="arrow-up" size={16} color="#EF4444" />
            ) : (
              <Feather name="arrow-down" size={16} color="#10B981" />
            )}
            <Text className={`ml-1 ${isIncreased ? 'text-red-500' : 'text-green-500'}`}>
              {Math.abs(temperatureDiff)}°C
            </Text>
          </View>
        </View>
        <Text className="text-gray-600">
          Temperature changed from {notification.previousTemperature}°C to {notification.temperature}°C
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="h-full bg-gray-100 px-5">
      <View className='flex flex-row items-center justify-between mt-5'>
        <Text className="text-2xl font-bold">Notifications</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map(renderNotificationCard)}
      </ScrollView>
    </SafeAreaView>
  );
}
