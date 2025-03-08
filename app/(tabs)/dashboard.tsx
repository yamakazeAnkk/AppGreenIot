import { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Send } from "lucide-react-native";
import ChatMessage from "@/components/chat-message";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const initialMessages = [
  { id: "1", role: "assistant", content: "Hello! How can I help you today?" },
  
];

export default function App() {
  const tabBarHeight = useBottomTabBarHeight();
  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (inputText.trim() === "") return;
  
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputText,
    };
  
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputText("");
  
    // Fetch response from Gemini API
    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: inputText }]
          }]
        }),
      });
  
      const data = await response.json();
      console.log('API Response:', data);  // Debugging log
  
      // Kiểm tra dữ liệu trả về từ API có đúng định dạng không
      if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
        const content = data.candidates[0].content;
  
        // Truy xuất text từ parts của content
        if (Array.isArray(content.parts) && content.parts[0]?.text) {
          const newAssistantMessage = {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: content.parts[0].text.trim(),  // Truy xuất text từ phần đầu tiên của parts
          };
          setMessages((prevMessages) => [...prevMessages, newAssistantMessage]);
        } else {
          console.error("Unexpected content format:", content);
        }
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching Gemini response:", error);
    }
  };
  
  
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <StatusBar style="dark" />
      <View className="flex-1 pt-2" style={{ marginBottom: tabBarHeight * 0.65 }}>
        <View className="px-4 py-2 border-b border-gray-200">
          <Text className="text-black text-xl font-semibold text-center">ChatBox</Text>
        </View>

        <ScrollView
          className="flex-1 px-4"
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message as any} />
          ))}
          <View className="h-5" />
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="border-t border-gray-200 bg-white px-4 py-2"
        >
          <View className="flex-row items-center space-x-2">
            <TextInput
              className="flex-1 bg-white text-black rounded-full px-4 py-2 border border-gray-300"
              placeholder="Message ..."
              placeholderTextColor="#6B7280"
              value={inputText}
              onChangeText={setInputText}
              multiline
            />
            <TouchableOpacity
              onPress={handleSend}
              className="bg-green-600 w-10 h-10 rounded-full items-center justify-center"
              disabled={inputText.trim() === ""}
            >
              <Send size={20} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
