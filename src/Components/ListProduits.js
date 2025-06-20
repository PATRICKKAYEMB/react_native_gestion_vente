import { View, Text,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { BASEUrl } from '../api/api'

const ListProduits = ({name,prix,id,image}) => {
    const navigation = useNavigation()
  return (
        <>
        <TouchableOpacity style={Styles.container}  onPress={() => navigation.navigate("detailProduit", { id })}>
          
                <View  style={Styles.imageWrapper}>  
                      <Image source={{uri:`${BASEUrl}${image}`}} style={Styles.image} />
                </View>
               
                <View style={Styles.text}>
                    <Text style={Styles.text1}>{name}</Text>
                    <Text style={Styles.text1}>{prix}</Text>
                </View>

         
        </TouchableOpacity>
        </>
  )
}


const Styles= StyleSheet.create({
    container:{
        width:"45%",
        marginBottom:13,
        borderRadius: 10,
        backgroundColor:"green"
       
    },
    imageWrapper:{
        height:150,
        borderRadius:20,
        backgroundColor:"red",
        overflow: "hidden",   
    },
    image:{
        width:"100%",
        height:"100%",
        resizeMode: "cover",
      
        
       

    },

    text:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:10
    },
    text1:{
        color:"white",
        fontSize:15
    }
    
})
export default ListProduits