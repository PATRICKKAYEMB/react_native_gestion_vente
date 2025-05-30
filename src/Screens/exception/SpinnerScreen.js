import { View, Text,StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import Footer from '../../Components/Footer'
import Navbar from '../../Components/Navbar'

const SpinnerScreen = () => {
  return (
    <View style={styles.container}>
        <Navbar/>

                <View style={styles.content}>

                <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>Chargement en cours...</Text>
                </View>

                

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
        paddingTop:10,
        alignItems:"center",
        justifyContent:"center",
        gap:10

    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: '#333',
      },
    indicator:{
        width:300,
        height:300
    }
})

export default SpinnerScreen