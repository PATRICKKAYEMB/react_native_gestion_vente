import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'





import * as SecureStore from "expo-secure-store"
import { useNavigation } from '@react-navigation/native'







import { Feather } from "@expo/vector-icons"








const Logout = () => {
   const navigation =useNavigation()

   

  return (
    <View>
        <TouchableOpacity onPress={signOut}>
        <Feather name="logout" size={24} color="white" />
        </TouchableOpacity>
    </View>
  )
}

export default Logout