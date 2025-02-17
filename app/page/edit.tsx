import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/auth';

export default function EditProfile() {
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');

  const handleSave = () => {
    // Implement save functionality here
    // This could involve updating the user's profile in Firebase
    console.log('Saving profile changes:', { name, email });
    router.back();
  };

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
            source={require('@/assets/images/avatar.png')}
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
            onChangeText={setEmail}
            keyboardType="email-address"
            className="border border-gray-300 rounded-lg p-3 mb-5"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

