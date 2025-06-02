import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { useQuery } from '@tanstack/react-query';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';
import { countNotification } from '../api/apiNotification';

import * as SecureStore from "expo-secure-store"
import useAuth from '../context/AuthContext';






const Navbar = () => {

  const {logout} =useAuth()

  const [HideLogout,setHideLogout]= useState(false)

  const signOut = async ()=>{
    await SecureStore.deleteItemAsync("access")
    await  SecureStore.deleteItemAsync("refresh")
  
    navigation.navigate("Login")
  
    
  }

  const {data:countsData} = useQuery({
    queryKey:["countNotif"],
    queryFn:countNotification
})

const countData = countsData?.count ?? 0
  const navigation= useNavigation()
  return (
    <View style={styles.container}>


      <Text style={styles.text1}>
            Store
      </Text>


          <View  style={styles.parametre}>

         
                <TouchableOpacity style={styles.box2} onPress={()=> navigation.navigate("notification")}>   
                <View style={styles.boxBell}> 
                    
                    {
                countData > 0 ? (
                    <View style={styles.bell}>
                        <Text style={styles.textBell}>{countData}</Text>
                    </View> 
                  
                ) : null
                }
                    <Feather name="bell" size={24} color="white" />
                    </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={()=> setLogout((prev)=> !prev)} >
                         <Feather name="more-vertical" size={24} color="white" />
                </TouchableOpacity>

           </View>

              {
                HideLogout && <View  style={styles.logOutBox}>
                            <TouchableOpacity  onPress={logout} style={styles.logOutBox2}>
                               <MaterialIcons name="logout" size={24} color="white" />
                                    <Text style={styles.logOutText}>Logout</Text>
                                   
                            </TouchableOpacity>
                              
                           </View>
              }
            
    </View>
  )
}


const styles=StyleSheet.create({
    container:{
        paddingTop:30,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:"full",
        height:"10%",
        backgroundColor:"#0D47A1",
        paddingHorizontal:10,
        position:"relative"
    },
    text1:{
      color:"orange",
      fontSize:18,
      fontWeight:"bold"
        
    },
    text2:{
      color:"black",
      fontSize:18,
      fontWeight:"bold"
        
    },
    parametre:{
        gap:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },

    box:{
     
      alignItems:"center",
      backgroundColor:"white",
      justifyContent:"center",
      borderRadius:"100%",
      height:40,
      width:40,
      borderColor:"red",
      borderWidth:3

    },


    box2:{
    
     
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

      

  },
  logOutBox:{
    position:"absolute",
    width:130,
    height:100,
    backgroundColor:"#0D47A1",
    right:0,
    zIndex:20,
    top:"150%"
  },
  logOutBox2:{
    paddingVertical:20,
    paddingHorizontal:10,
    flexDirection:"row",
    gap:10
  },
  logOutText:{
    fontSize:18,
    fontWeight:"semibold",
    color:"#fff"
  }
    
})
export default Navbar