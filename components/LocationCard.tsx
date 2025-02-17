import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

type LocationCardProps = {
  gardenImage: string;
  name: string;
  id: string; 
}

export default function LocationCard({gardenImage, name, id}: LocationCardProps) {
  const router = useRouter();
  const handlePress = () => {
    // Sử dụng object-based navigation
    router.push({
      pathname: '/page/[id]',
      params: {
        id: id,
        image: gardenImage,
        name: name,
      },
    });
    
  };
  return (
    <TouchableOpacity onPress={handlePress}>
        <View className='w-full bg-white relative border-none rounded-3xl overflow-hidden'>
            <ImageBackground 
              source={{uri: gardenImage}} 
              className='w-full h-40 rounded-3xl'
              blurRadius={4}
            >
             <View className='absolute top-2 right-2'>
                <Text className='text-white text-2xl font-semibold'>{name}</Text>
             </View>
            </ImageBackground>
        </View>
    </TouchableOpacity>
  )
}