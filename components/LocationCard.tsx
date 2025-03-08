import { View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Garden } from './types'

interface LocationCardProps {
  garden: Garden
}

export default function LocationCard({garden}: LocationCardProps) {
  const router = useRouter();
  const handlePress = () => {
   
    router.push({
      pathname: '/page/[id]',
      params: {
        id: garden.id,
        image: encodeURIComponent(garden.gardenImage),
        name: garden.name,
      },
    });
    
  };

  return (
    <TouchableOpacity onPress={handlePress}>
        <View className='w-full bg-white relative border-none rounded-3xl overflow-hidden'>
            <ImageBackground 
              source={{uri: garden.gardenImage}} 
              className='w-full h-40 rounded-3xl'
              blurRadius={4}
            >
             <View className='absolute top-2 right-2'>
                <Text className='text-white text-2xl font-semibold'>{garden.name}</Text>
             </View>
            </ImageBackground>
        </View>
    </TouchableOpacity>
  )
}