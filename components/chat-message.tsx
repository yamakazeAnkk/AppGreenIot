import { View, Text } from "react-native"

type MessageProps = {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
  }
}

const ChatMessage = ({ message }: MessageProps) => {
  const isUser = message.role === "user"

  return (
    <View className="py-4 bg-white mb-2.5 rounded-lg">
      <View className="flex-row">
        <View
          className={`w-8 h-8 rounded-full mr-3 items-center justify-center ${isUser ? "bg-green-500" : "bg-purple-500"}`}
        >
          <Text className="text-black font-bold">{isUser ? "U" : "AI"}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-black font-semibold mb-1">{isUser ? "You" : "Assistant"}</Text>
          <Text className="text-black leading-5">{message.content}</Text>
        </View>
      </View>
    </View>
  )
}

export default ChatMessage

