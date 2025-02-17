import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import LocationCard from './LocationCard';
import { auth } from '../firebase';

interface Garden {
  gardenImage: string;
  name: string;
  id: string; 
}

export default function LocationGrid() {
  const [locations, setLocations] = useState<Garden[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Lấy người dùng hiện tại từ Firebase Auth
      const user = auth.currentUser;
      if (!user) {
        console.error('Không có người dùng hiện tại');
        setLoading(false);
        return;
      }

      // Lấy user_id từ Firebase (uid)
      const userId = user.uid;
      console.log('User ID:', userId);

      try {
        // Gọi API với URL có chứa userId lấy được từ Firebase
        const response = await fetch(`http://localhost:8080/api/gardens/user/${userId}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Lỗi khi lấy dữ liệu từ API');
        }
        const data = await response.json();
        console.log('Data from API:', data);

        // Chuyển đổi dữ liệu: ánh xạ "gardenId" thành "id"
        const transformedData: Garden[] = data.map((item: any) => ({
          id: item.gardenId,
          name: item.name,
          gardenImage: item.gardenImage,
        }));

        setLocations(transformedData);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách gardens:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={{ backgroundColor: '#f0f0f0' }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ paddingTop: 16 }}>
        {locations.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Không có dữ liệu</Text>
        ) : (
          locations.map((item, index) => (
            <View key={index} style={{ marginBottom: 16 }}>
              <LocationCard gardenImage={item.gardenImage} name={item.name} id={item.id} />
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
