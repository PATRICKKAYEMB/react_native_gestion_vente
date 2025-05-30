import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Footer from '../../Components/Footer'
import Navbar from '../../Components/Navbar'

const NotFoundScreen = () => {
  return (
    <View style={styles.container}>
        <Navbar/>
          <View style={styles.content}>
                <Text style={styles.text}>
                Aucune donnée trouvée.
                </Text>

          </View>

          <Footer/>
    </View>
  )
}

const styles= StyleSheet.create({
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

export default NotFoundScreen