import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'



const ScannerScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Navbar/>
        
            <View style={styles.box}>

                <View style={styles.scanner}>
                    <Text>camera</Text>
                </View>
                
                <TouchableOpacity style={styles.validerScanner} onPress={()=>navigation.navigate("confirmerScreen")}>
                    <Text style={styles.validerText}>valider</Text>
                </TouchableOpacity>
            </View>

        <Footer/>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
       
      
    },

    box:{
        height:"80%",
        width:"full",
        backgroundColor:"blue",
        alignItems:"center",
      paddingTop:"30%"
    },
    scanner:{
        width:250,
        height:200,
        backgroundColor:"green",
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center"
    },
    validerScanner:{
        marginTop:60,
        paddingVertical:15,
        paddingHorizontal:60,
        backgroundColor:"orange",
        
    },
    validerText:{
        color:"white",
        fontSize:18,
        fontWeight:"bold"
    }

})

export default ScannerScreen