import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
            <Navbar/>
        <View style={styles.content} >

                <View style={styles.notification}>
                    <Text style={styles.text1}>Notification</Text>
                </View>

                <View style={styles.vente}>
                    <Text style={styles.text1}>Ventes</Text>
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
        gap:50

    },
    box:{
        paddingHorizontal:20,
        paddingVertical:20,

    },
    text:{
        fontSize:20,
        
    },
    notification:{
            width:200,
            height:100,
            alignItems:"center",
            justifyContent:"center",
            backgroundColor:"#0D47A1",
            borderRadius:10

    },
    vente:{
        width:200,
        height:100,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#0D47A1",
        borderRadius:10
    },
    text1:{
        fontSize:20,
        color:"white"

    }

})

export default HomeScreen