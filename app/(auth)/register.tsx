import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Please enter email and password!");
      return;
    }
    if (password !== confirmPassword) {
      alert("Mật khẩu và mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    try {
      // Xử lý đăng ký Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Gửi dữ liệu người dùng vào API
      const response = await fetch('http://localhost:8080/api/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.uid, // Lấy user ID từ Firebase
          name: email, // Lấy tên từ email
          dateOfBirth: "", // Cung cấp ngày sinh nếu cần
          phone: "", // Cung cấp số điện thoại nếu cần
          image: "https://firebasestorage.googleapis.com/v0/b/bookstore-59884.appspot.com/o/images%2F1741158783923-photo.jpg?alt=media&token=72becb90-a582-4325-90ba-b48f64c3b0f8", // Ảnh mặc định
          role: "user", // Cung cấp role (có thể thay đổi)
        }),
      });

      if (response.ok) {
        router.replace("/(tabs)"); // Điều hướng đến trang chính sau khi đăng ký thành công
      } else {
        alert("Đã xảy ra lỗi khi gửi thông tin người dùng!");
      }
    } catch (error: any) {
      alert("Đăng ký thất bại: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
      keyboardVerticalOffset={100} // Adjust this value to push the layout up
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-5 justify-center">
            <Image
              source={require("../../assets/images/houseplant.png")}
              className="w-full pt-10"
              resizeMode="contain"
            />
            <View className="flex-1 justify-center">
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
              <TextInput
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                className="w-full bg-gray-50 rounded-lg px-4 py-3 mb-4"
              />
              <TouchableOpacity
                onPress={handleRegister}
                disabled={isLoading}
                className="w-full bg-black rounded-lg py-4 mb-4"
              >
                <Text className="text-white text-center font-medium">
                  {isLoading ? "Please wait..." : " Register"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                <Text className="text-center text-gray-600">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
