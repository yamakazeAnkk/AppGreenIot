import { SafeAreaView, Text, View, Image, Button, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { auth } from '@/firebase';
import AddLocationModal from '@/components/AddLocationModal';
import Search from '@/components/Search';
import { Weather } from '@/components/WeatherCard';
import LocationGrid from '@/components/LocationGird';
import { Garden } from '@/components/types';

const Index = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const user = auth.currentUser;
  const userId = user?.uid;
  
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchedGardens, setSearchedGardens] = useState<Garden[]>([]);
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; image: string }>({
    name: '',
    image: '',
  });
  const [reload, setReload] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUserName(user.displayName || 'John Doe');
      setUserImage(user.photoURL || 'https://example.com/default-avatar.png');
    }
  }, [user]);

  // Fetch user data from API
  const fetchUserData = async () => {
    if (userId) {
      try {
        const response = await fetch(`http://localhost:8080/api/User/${userId}`);
        const data = await response.json();
        setUserInfo({
          name: data.name || 'N/A',
          image: data.image || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  // Handle search and fetch gardens
  const fetchGardens = async () => {
    if (!searchQuery.trim()) {
      setSearchedGardens([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://0.0.0.0:8080/api/gardens/user/${userId}/garden?name=${encodeURIComponent(searchQuery)}`,
        {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        }
      );
      const data = await response.json();
      const transformedData: Garden[] = data.map((item: any) => ({
        id: item.gardenId,
        name: item.name,
        gardenImage: item.gardenImage,
      }));
      setSearchedGardens(transformedData);
    } catch (error) {
      console.error('Error fetching gardens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGardens();
  }, [searchQuery, userId, reload]);

  const handleAddPress = async (name: string, location: string, imageUri: string): Promise<boolean> => {
    if (!userId) {
      console.error('UserId is missing');
      return false;
    }
    if (!name || !location || !imageUri) {
      console.error('Name, Location, and Image are required');
      alert('Please fill all fields: Name, Location, and Image are required');
      return false;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('userId', userId);
    formData.append('location', location);
    const imageBlob = {
      uri: imageUri,
      type: 'image/jpeg',
      name: `${Date.now()}-photo.jpg`,
    } as unknown as Blob;
    formData.append('image', imageBlob);

    setSubmitLoading(true);
    try {
      const response = await fetch('http://0.0.0.0:8080/api/gardens', {
        method: 'POST',
        headers: {
          Accept: '*/*',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        console.error('Response text:', text);
        return false;
      }

      console.log(result);

      if (response.ok) {
        setIsModalVisible(false);
        Alert.alert('Success', 'Garden added successfully', [
          { text: 'OK', onPress: () => {
            setReload(prev => !prev);
          }}
        ]);
        return true;
      } else {
        console.error('Error adding garden:', result);
        return false;
      }
    } catch (error) {
      console.error('Error adding garden:', error);
      return false;
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center gap-3">
            <Image source={{ uri: userInfo.image }} className="w-10 h-10 rounded-full" />
            <Text className="text-base font-rubik-medium text-black-300">{userInfo.name}</Text>
          </View>
        </View>
        <Weather city="Ho Chi Minh City" className="mt-5" />

        {/* Search component: truyền hàm cập nhật searchQuery */}
        <Search onSearch={setSearchQuery} />

        <View className="flex flex-row items-center px-5 mt-5 justify-between">
          <Text className="text-xl font-rubik-medium text-black-300">Location</Text>
          <Button title="Add" onPress={() => setIsModalVisible(true)} />
        </View>

        <View className="flex-1" style={{ marginBottom: tabBarHeight * 0.5 }}>
          <LocationGrid
            garden={searchedGardens[0] || undefined}
            loading={searchQuery.trim() !== '' ? loading : false}
          />
        </View>
      </View>

      <AddLocationModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleAddPress={handleAddPress}
      />

      {submitLoading && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Index;
