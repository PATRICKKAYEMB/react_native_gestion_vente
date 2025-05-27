import { Text, View,StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const  Footer = ()=>{
    const navigation=useNavigation()

    return (
      <View style={styles.container}>
            

            <TouchableOpacity style={styles.box} onPress={()=> navigation.navigate("scanner")}>

                <AntDesign name='scan1' size={35}  color={"white"}/>
            <Text style={styles.TextBox}>Scanner</Text>
                
            </TouchableOpacity>

            <TouchableOpacity style={styles.box} onPress={()=> navigation.navigate("stock")}>
                <AntDesign name='appstore-o' size={35} color={"white"} />
            <Text style={styles.TextBox}>Stock</Text>

                
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.box} onPress={()=> navigation.navigate("Historique")}>
                <AntDesign name='barchart' size={35} color={"white"}  />
            <Text style={styles.TextBox}>historique</Text>
                
            </TouchableOpacity>

           
        
      </View>
    )
  }


const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"8%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"#2F4F4F",
        paddingHorizontal:20,
        paddingVertical:15,
        borderBottomColor:"black",
        borderBottomWidth:1
        
    },

    box:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        
        
    },

    TextBox:{
        color:"white",
        fontSize:12,

        

    }
})

export default Footer