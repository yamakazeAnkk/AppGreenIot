import { Button, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { settings } from '../../data/data'
import { auth } from '@/firebase'
import { router, useRouter } from 'expo-router'
import { useAuth } from '@/context/auth'
import { signOut } from 'firebase/auth'

export default function Profile() {
    const user = auth.currentUser;
    const userId = user?.uid;

    const [userInfo, setUserInfo] = useState<{ name: string; image: string }>({
        name: '',
        image: '',
    });
    
    const router = useRouter();
    

    const handleLogout = async () => {
        await signOut(auth);
        router.replace('/(auth)/login');
    };

    const handleEditProfile = () => {
        router.push('/page/edit');
    };

    const fetchUserData = async () => {
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
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    type SettingsItemProps = {
        icon: React.ComponentType<any>;
        iconName: string;
        title: string;
        onPress: () => void;
        textStyle?: any;
        showArrow?: boolean;
    };

    const Settings = ({ icon: Icon, iconName, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => (
        <TouchableOpacity onPress={onPress} className={`flex flex-row items-center justify-between gap-3 mt-10 ${textStyle}`}>
            <View className='flex flex-row items-center gap-3'>
                <Icon name={iconName} size={24} color='black' />
                <Text className="text-xl font-rubik-medium">{title}</Text>
            </View>
            {showArrow && <Ionicons name='chevron-forward-outline' size={24} color='black' />}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
                <View className='flex flex-row items-center justify-between mt-5'>
                    <Text className='text-2xl font-bold'>Profile</Text>
                    <Ionicons name='settings-outline' size={24} color='black' />
                </View>
                <View className="flex-row items-center justify-center mt-5">
                    <View className="flex flex-col items-center relative rounded-full">
                        {/* Hiển thị ảnh người dùng */}
                        <Image
                            source={{ uri: userInfo.image || 'https://example.com/default-avatar.png' }} // Đặt ảnh mặc định nếu không có ảnh
                            className="size-44 rounded-full"
                        />
                        {/* Hiển thị tên người dùng */}
                        <Text className="text-2xl font-bold">{userInfo.name || 'Unknown'}</Text>
                    </View>
                </View>
                <View className='w-11/12 mx-auto'>
                    <View className="flex flex-col">
                        {settings.map((item, index) => (
                            <Settings
                                key={index}
                                icon={item.icon}
                                iconName={item.iconName}
                                title={item.title}
                                onPress={item.title === 'Edit Profile' ? handleEditProfile : () => {}}
                                textStyle='text-2xl font-bold'
                                showArrow={true}
                            />
                        ))}
                    </View>
                    <View>
                        <Settings icon={MaterialIcons} iconName='logout' title='Logout' onPress={handleLogout} textStyle='text-2xl font-bold' showArrow={true} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
