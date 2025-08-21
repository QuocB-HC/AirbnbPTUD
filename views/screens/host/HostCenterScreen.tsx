import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { signOut } from '../../../services/authService'

export default function HostCenterScreen() {
  return (
    <View>
      <Text>HostCenterScreen</Text>

      <Button onPress={() => signOut()} title="Đăng xuất" />
    </View>
  )
}

const styles = StyleSheet.create({})