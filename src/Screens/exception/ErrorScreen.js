import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

const ErrorScreen = () => {
  return (
    <View style={styles.container}>
       <Navbar/>
          <View style={styles.content}>
                <Text style={styles.text}>
                Erreur lors du chargement du produit.
                </Text>

          </View>

         <Footer/>
    </View> 
  )
}
const styles =StyleSheet.create({
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
    text:{
        textAlign:"center",
        fontSize:20
        
    }
})

export default ErrorScreen