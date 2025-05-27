import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Navbar = () => {
  return (
    <View style={styles.container}>


      <Text style={styles.text1}>
            Logo
      </Text>


      <View style={styles.box}>
          
            <Text style={styles.text2}>PK</Text>

      </View>

      
    </View>
  )
}


const styles=StyleSheet.create({
    container:{
        paddingTop:20,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        width:"full",
        height:"10%",
        backgroundColor:"#2F4F4F",
        paddingHorizontal:20
    },
    text1:{
      color:"white",
      fontSize:18,
      fontWeight:"bold"
        
    },
    text2:{
      color:"black",
      fontSize:18,
      fontWeight:"bold"
        
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

    }
    
})
export default Navbar