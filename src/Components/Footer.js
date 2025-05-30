import { Text, View,StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import { AntDesign } from '@expo/vector-icons'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'



const  Footer = ()=>{

   


    const navigation=useNavigation()

    return (
      <View style={styles.container}>
            
            <TouchableOpacity style={styles.box} onPress={()=> navigation.navigate("home")}>

                <AntDesign name='home' size={35}  color={"white"}/>
            <Text style={styles.TextBox}>Scanner</Text>
                
            </TouchableOpacity>


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
        backgroundColor:"#0D47A1",
        paddingHorizontal:20,
        paddingVertical:15,
        borderBottomColor:"black",
        borderBottomWidth:1
        
    },

    box:{
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        position:"relative"
        
        
    },
    
    bell:{
        right:-2,
        top:-2,
        width:15,
        height:15,
        alignItems:"center",
        position:"absolute",
        justifyContent:"center",
        borderRadius:"50%", 
        backgroundColor:"red",
        zIndex:10
       
    },
    textBell:{
        color:"white",
        fontSize:12,
        textAlign:"center"
    },

    TextBox:{
        color:"white",
        fontSize:12,

        

    }
})

export default Footer