import { View, Text,StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Categorie = ({text,id}) => {

   const navigation=useNavigation()
  return (
    <>
   
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("listeProduits", { id })} >
        <View style={styles.box}>
                <Image  source={require("../../assets/chargeur.png")} style={styles.image}/>
               
       
                <View>
                    <Text style={styles.text1}>{text}</Text>
                   
                </View>

        </View>

          
        <AntDesign name='right' size={25} />
        </TouchableOpacity>


    
    </>
   
  )
}

const styles= StyleSheet.create({
    container:{
        width:"100%",
      
        marginBottom:25,
           
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"

    },

    box:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        gap:4
    },
    image:{
        width:100,
        height:"90",
        borderRadius:15,
        backgroundColor:"green",
        marginRight:10
    },
    text1:{
        color:"blue",
        fontSize:18,
        fontWeight:"bold"
    },

    text2:{
        color:"black",
        fontSize:15,
         fontWeight:"bold"

        
    }



})

export default Categorie