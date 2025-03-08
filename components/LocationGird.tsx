import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import LocationCard from './LocationCard';
import { auth } from '../firebase';
import { Garden } from './types';

interface LocationGridProps {
  garden?: Garden;      // Nếu có kết quả tìm kiếm, truyền đối tượng Garden
  loading?: boolean;    // Trạng thái loading từ Index nếu có
}

export default function LocationGrid({ garden, loading }: LocationGridProps) {
  const [locations, setLocations] = useState<Garden[]>([]);
  const [localLoading, setLocalLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLocalLoading(true);
    const user = auth.currentUser;
    if (!user) {
      console.error('Không có người dùng hiện tại');
      setLocalLoading(false);
      return;
    }
    const userId = user.uid;
    console.log('User ID:', userId);

    try {
      const response = await fetch(`http://localhost:8080/api/gardens/user/${userId}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) {
        throw new Error('Lỗi khi lấy dữ liệu từ API');
      }
      const data = await response.json();
      const transformedData: Garden[] = data.map((item: any) => ({
        id: item.gardenId,
        name: item.name,
        gardenImage: item.gardenImage,
      }));
      console.log(transformedData[0].gardenImage);

      setLocations(transformedData);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách gardens:', error);
    } finally {
      setLocalLoading(false);
    }
  };
  

  useEffect(() => {
    if (garden) {
      setLocations([garden]);
    } else {
      fetchData();
    }
  }, [garden]);

  const isLoading = loading !== undefined ? loading : localLoading;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (locations.length === 0) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có dữ liệu</Text>;
  }

  return (
    <ScrollView
      style={{ backgroundColor: '#f0f0f0' }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: 16 }}>
        {locations.map((item, index) => (
          <View key={index} style={{ marginBottom: 16 }}>
            <LocationCard garden={item} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
