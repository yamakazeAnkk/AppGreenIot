import { View, Text, KeyboardAvoidingView, Platform, Image, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            alert('Please enter email and password!');
            return;
        }
        

        setIsLoading(true);
        try {
            const currentUser = await signInWithEmailAndPassword(auth, email, password);
            const user = currentUser.user;
            

            const idToken = await user.getIdToken();

            console.log(idToken);
        // In token ra console
            console.log('Firebase ID Token:', idToken);
            router.replace('/(tabs)');
        } catch (error) {
            alert('Login failed: ' + error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View className="flex-1 px-5 justify-center">
                            <Image
                                source={require('../../assets/images/houseplant.png')}
                                className='w-full pt-10'
                                resizeMode='contain'
                            />
                            <View className="flex-3 justify-center">
                                <Text className="text-3xl text-[#4A6741] font-semibold text-center mb-2">
                                    GreenIQ
                                </Text>
                                <Text className="text-center text-gray-600 mb-1">
                                    Your Premier Destination for Lush Greenery
                                </Text>
                                <Text className="text-center text-gray-600 mb-8">
                                    Elevate your space with our exceptional plant selection
                                </Text>
                                <TextInput
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    className="w-full bg-gray-50 rounded-lg px-4 py-3 mb-4"
                                />
                                <TextInput
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                    autoCapitalize="none"
                                    className="w-full bg-gray-50 rounded-lg px-4 py-3 mb-4"
                                />
                                <TouchableOpacity
                                    onPress={handleLogin}
                                    disabled={isLoading}
                                    className="w-full bg-black rounded-lg py-4 mb-4"
                                >
                                    <Text className="text-white text-center font-medium">
                                        {isLoading ? 'Please wait...' : 'Login'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                                    <Text className="text-center text-gray-600">
                                        Register
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
