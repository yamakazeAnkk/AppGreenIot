import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const notification = () => {
  return (
    <View style={styles.container}>
      <Text>notification</Text>
    </View>
  )
}

export default notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})