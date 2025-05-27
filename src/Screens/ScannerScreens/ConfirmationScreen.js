import { View, Text,StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'

const ConfirmationScreen = ({navigation}) => {
  return (
    <View>
      <Navbar/>

      <View style={styles.box}  >
                <View style={styles.produit}>
                    <Text> 
                        best
                    </Text>

                   
                </View>

                <TouchableOpacity style={styles.validerVente} onPress={()=>navigation.navigate("succesScreen")}>
                        <Text style={styles.validerText}> 
                            confirmer vente
                        </Text>
                    </TouchableOpacity>
      </View>
      <Footer/>
    </View>
  )
}


const styles = StyleSheet.create({
    box:{
        height:"80%",
        width:"full",
        backgroundColor:"blue",
        alignItems:"center",
      paddingTop:"30%"
    },
    validerVente:{
        marginTop:60,
        paddingVertical:15,
        paddingHorizontal:60,
        backgroundColor:"orange",
        
    },
    produit:{
        width:250,
        height:200,
        backgroundColor:"green",
        textAlign:"center",
        alignItems:"center",
        justifyContent:"center"
    },
    validerText:{
        color:"white",
        fontSize:18,
        fontWeight:"bold"
    }
})
export default ConfirmationScreen