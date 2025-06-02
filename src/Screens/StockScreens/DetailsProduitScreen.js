import { View, Text,StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Navbar from '../../Components/Navbar'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Detail_produit } from '../../api/produitsApi'
import Footer from '../../Components/Footer'
import NotFoundScreen from '../exception/NotFoundScreen'
import ErrorScreen from '../exception/ErrorScreen'
import SpinnerScreen from '../exception/SpinnerScreen'
import { BASEUrl } from '../../api/api'

const DetailsProduitScreen = () => {
  const route = useRoute()
  const {id} = route.params

  const { data, isLoading, error } = useQuery({
    queryKey:["produit",id],
    queryFn: ()=> Detail_produit(id)
  })

  const navigation= useNavigation()

  const renderStatusColor = (status) => {
    if (status === "yellow") return <View style={styles.yellow} />;
    if (status === "red") return <View style={styles.red} />;
    if (status === "green") return <View style={styles.green} />;
    return null;
  };
  

  if (isLoading) {
    return <SpinnerScreen/>
  }

  if (error) {
    return <ErrorScreen/>
  }

  if (!data) {
    return <NotFoundScreen/>
  }
 
  return (
    <View style={styles.container}>
      <Navbar/>
<View style={styles.content} >
      
          <View  >  
              
                 <Image source={{ uri: `${BASEUrl}${data.image}`}} style={styles.image} />

                <View style={styles.text}>
                  <View style={styles.text1}>
                        <Text style={styles.message}>{data.name}</Text>
                        <Text style={styles.prix}>{data.prix} Fc</Text>
                  </View>
                  <View style={styles.text2}>
                        <Text>quantite :  {data.quantite}</Text>
                        <View style={styles.status}>
                                <Text >Status: </Text>   {renderStatusColor(data.status)}
                        </View>
                        
                  </View>

                 
                  <View style={styles.text3} >
                        <Text>date ajout:</Text>
                        <Text>{data.date_ajout}</Text>
                  </View>
                
              </View>
        
        </View>

    <View style={styles.boxVente}>

   
        <TouchableOpacity   style={styles.vente}  onPress={() => navigation.navigate("venteProduit", { id: data.id })}  >
        <Text style={styles.VenteText}>Vendre</Text>   
        </TouchableOpacity>
         
  </View>
 
      </View>  

     <Footer/>
    </View>
  )
}

const styles= StyleSheet.create({
     
      container:{
        height:"100%",
      
      },
      content:{
        height:"78%",
        width:"full",
      
        
      },
      

      image:{

        width:"full",
        height:350,
        backgroundColor:"green"

      },
      text:{
          paddingHorizontal:20
      },
      text1:{
          marginTop:5,
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"space-between"

      },

      text2:{
        marginTop:5,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between"
        
    },

    text3:{
      marginTop:5,
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"space-between"
      
  },
  message:{
      fontSize:16,
      fontWeight:"bold"
  },
  prix:{
      fontSize:20,
      padding:5,
      fontWeight:"bold",
      backgroundColor:"orange",
      borderWidth:1,
      color:"white",
      borderRadius:20
    
  },
  boxVente:{
    width:"100%",
    alignItems:"center",
    justifyContent:'center'

  },
  vente:{
    paddingHorizontal:4,
    paddingVertical:8,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    width:200,
    backgroundColor:"#0D47A1"
  },
  VenteText:{
    color:"white",
    textAlign:"center",
    fontSize:20
  },
  red:{
    width:60,
    height:20,
    backgroundColor:"red"
  }
  ,
  yellow:{
    width:60,
    height:20,
    backgroundColor:"yellow"
  }
  ,
  green:{
    width:60,
    height:20,
    backgroundColor:"green"
  },
  status:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    gap:5
  }

})

export default DetailsProduitScreen