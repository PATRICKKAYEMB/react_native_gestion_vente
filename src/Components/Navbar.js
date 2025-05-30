import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import { useQuery } from '@tanstack/react-query';
import Feather from '@expo/vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { countNotification } from '../api/apiNotification';


const Navbar = () => {
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

                <TouchableOpacity onPress={()=> navigation.navigate("notification")}>
                         <Feather name="more-vertical" size={24} color="white" />
                </TouchableOpacity>

           </View>

      
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
        paddingHorizontal:10
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
        gap:10,
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

      

  }
    
})
export default Navbar