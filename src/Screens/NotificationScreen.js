import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const NotificationScreen = () => {
  
    return (
        <View  style={styles.container}>
            <Navbar/>
            <View style={styles.content}>
    
    
            </View>
            <Footer/>
         
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        container:{
            height:"100%"
    
        },
        content:{
            width:"full",
            height:"78%",
            paddingTop:10
        },
    })

export default NotificationScreen