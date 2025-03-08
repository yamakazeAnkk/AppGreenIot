import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { auth } from '@/firebase';
type AlertNotification = {
  alertId: string;
  message: string;
  gardenName: string;
  timestamp: string;
  resolved: boolean;
};

export default function NotificationScreen() {
  const [alerts, setAlerts] = useState<AlertNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const user = auth.currentUser;
  const userId = user?.uid;

  // Hàm gọi API để lấy dữ liệu cảnh báo
  const fetchAlerts = async () => {
    try {
      const response = await fetch(`http://0.0.0.0:8080/api/Alert/${userId}`, {
        method: 'GET',
        headers: {
          'accept': '*/*'
        }
      });
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // Render từng thẻ cảnh báo
  const renderAlertCard = (alert: AlertNotification) => {
    const date = new Date(alert.timestamp);
    const formattedTime = date.toLocaleString();

    return (
      <TouchableOpacity key={alert.alertId} className="bg-white rounded-xl p-4 mb-4">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              {alert.resolved ? (
                  <Feather name="check-circle" size={24} color="#10B981" />
                ) : (
                  <Feather name="alert-circle" size={24} color="#EF4444" />
                )}
            </View>
            <View>
              <Text className="font-semibold text-lg">{alert.gardenName}</Text>
              <Text className="text-gray-500">{formattedTime}</Text>
            </View>
          </View>
        </View>
        <Text className="text-gray-600">{alert.message}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-2xl font-bold">Notifications</Text>
        </View>
        
      {loading ? (
        <ActivityIndicator size="large" color="#3B82F6" className="mt-10" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
          {alerts.map(renderAlertCard)}
        </ScrollView>
      )}
      </View>
    </SafeAreaView>
  );
}
