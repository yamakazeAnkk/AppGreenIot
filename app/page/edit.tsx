import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth';
import { auth } from '@/firebase';

interface UserData {
  id: string;
  name: string;
  dateOfBirth: string;
  phone: string;
  image: string;
}

export default function EditProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const user = auth.currentUser;
  const currentUser = user?.uid;
  const email = user?.email || ''; // Ensure email is a string

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:8080/api/User/${currentUser}`, {
          method: 'GET',
          headers: {
            'Accept': '*/*'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
        setDateOfBirth(data.dateOfBirth || '');
        setName(data.name);
        setPhone(data.phone || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const handleSave = () => {
    console.log('Saving profile changes:', { name, phone });
    router.back();
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-7 pb-10">
        <View className="flex-row items-center justify-between mt-5">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">Edit Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text className="text-blue-500 font-semibold">Save</Text>
          </TouchableOpacity>
        </View>

        <View className="items-center mt-10">
          <Image
            source={{ uri: userData?.image || 'https://via.placeholder.com/150' }}
            className="w-32 h-32 rounded-full"
          />
          <TouchableOpacity className="mt-4">
            <Text className="text-blue-500">Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-10">
          <Text className="text-gray-600 mb-2">Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="border border-gray-300 rounded-lg p-3 mb-5"
          />
          <Text className="text-gray-600 mb-2">Email</Text>
          <TextInput
            value={email}
            editable={false} // Make email non-editable
            className="border border-gray-300 rounded-lg p-3 mb-5"
          />

          <Text className="text-gray-600 mb-2">Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            className="border border-gray-300 rounded-lg p-3 mb-5"
          />

          <Text className="text-gray-600 mb-2">Date of Birth</Text>
          <TextInput
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            className="border border-gray-300 rounded-lg p-3 mb-5"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}