import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const dashboard = () => {
  return (
    <View style={styles.container}>
      <Text>dashboard</Text>
    </View>
  )
}

export default dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})