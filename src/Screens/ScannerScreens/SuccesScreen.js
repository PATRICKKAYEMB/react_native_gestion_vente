import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'


const SuccesScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.box}>
               
                <Feather name="check" size={80} color="white" />
                <Text style={styles.succcesText}>Succes</Text>
        </View>
     
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        alignItems:"center",
        justifyContent:"center",
        flex:1
        
    },
    box:{
        width:250,
        height:250,
        backgroundColor:"green",
        borderRadius:"50%",
        alignItems:"center",
        justifyContent:"center"
    },
    succcesText:{
        color:"white",
        fontSize:18

    }
})

export default SuccesScreen