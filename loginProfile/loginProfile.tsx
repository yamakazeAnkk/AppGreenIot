import { useState } from 'react'
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  Image,
  TamaguiProvider,
  Theme,
  Stack,
  styled,
} from 'tamagui'
import { createTamagui } from 'tamagui'
import { config } from '@tamagui/config/v3'

const tamaguiConfig = createTamagui(config)

const StyledInput = styled(Input, {
  borderWidth: 1,
  borderColor: '$gray8',
  borderRadius: 8,
  height: 50,
  padding: 10,
  fontSize: 16,
  backgroundColor: 'white',
  
  // Focus state
  hoverStyle: {
    borderColor: '$olive8',
  },
  focusStyle: {
    borderColor: '$olive8',
    borderWidth: 2,
  }
})

const LoginButton = styled(Button, {
  backgroundColor: '$gray9',
  height: 50,
  borderRadius: 8,
  
  // Pressed state
  pressStyle: {
    backgroundColor: '$gray10',
    opacity: 0.9,
  }
})

export default function LoginScreen() {
  const [email, setEmail] = useState('')

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Theme name="light">
        <YStack f={1} bg="white" px="$4" ai="center">
          {/* Safe area spacer */}
          <Stack h="$4" />

          {/* Plant Image */}
          <Stack my="$4">
            <Image
              source={{ uri: require('@/assets/images/houseplant.png') }}
              width={300}
              height={300}
              resizeMode="contain"
            />
          </Stack>

          {/* Title */}
          <Text
            color="$olive10"
            fontSize="$8"
            fontWeight="600"
            mb="$2"
          >
            GreenIQ
          </Text>

          {/* Tagline */}
          <Text
            color="$gray11"
            fontSize="$4"
            ta="center"
            px="$4"
            mb="$6"
          >
            Your Premier Destination for Lush Greenery:{'\n'}
            Elevate your space with our exceptional plant selection
          </Text>

          {/* Email Input */}
          <StyledInput
            w="100%"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
          />

          {/* Login Button */}
          <LoginButton w="100%" mt="$4">
            <Text color="white" fontSize="$4" fontWeight="600">
              Login / Register
            </Text>
          </LoginButton>

          <Text
            color="$gray10"
            fontSize="$4"
            textDecorationLine="underline"
            mt="$4"
            pressStyle={{
              opacity: 0.7
            }}
          >
            Not now
          </Text>
        </YStack>
      </Theme>
    </TamaguiProvider>
  )
}