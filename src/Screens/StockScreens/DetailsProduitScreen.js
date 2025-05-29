import { View, Text,StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Navbar from '../../Components/Navbar'

import { useNavigation, useRoute } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import { Detail_produit } from '../../api/produitsApi'
import Footer from '../../Components/Footer'

const DetailsProduitScreen = () => {
  const route = useRoute()
  const {id} = route.params

  const { data, isLoading, error } = useQuery({
    queryKey:["produit",id],
    queryFn: ()=> Detail_produit(id)
  })

  const navigation= useNavigation()

  if (isLoading) {
    return <Text>Chargement...</Text>;
  }

  if (error) {
    return <Text>Erreur lors du chargement du produit.</Text>;
  }

  if (!data) {
    return <Text>Aucune donnée trouvée.</Text>;
  }
 
  return (
    <View style={styles.container}>
      <Navbar/>
<View style={styles.content} >
      
          <View  >  
              
                 <Image source={require("../../../assets/ecouteur.jpg")} style={styles.image} />

                <View style={styles.text}>
                  <View style={styles.text1}>
                        <Text>{data.name}</Text>
                        <Text style={styles.prix}>{data.prix} Fc</Text>
                  </View>
                  <View style={styles.text2}>
                        <Text>quantite :  {data.quantite}</Text>
                        <Text>Etat: {data.status}</Text>
                  </View>

                 
                  <View style={styles.text3}>
                        <Text>date:</Text>
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
      
        paddingTop:10
      },
      

      image:{

        width:"full",
        height:300,
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
  prix:{
      fontSize:20,
      padding:5,
      fontWeight:"bold",
      borderWidth:1,
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
  }

})

export default DetailsProduitScreen