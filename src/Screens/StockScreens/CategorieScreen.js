import { View, Text ,StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Categorie from '../../Components/Categorie'
import { useQuery } from '@tanstack/react-query'
import { voir_categorie } from '../../api/apiCategorie'


const CategorieScreen = () => {

  const {data} =useQuery({
    queryKey:["categorie"],
    queryFn: voir_categorie



  })

  const categorieData = data || []
  return (
    <View style={styles.container}>
        <Navbar/>
            <View style={styles.box}> 
                <View  style={styles.categorieSelect}>
                  <Text>All</Text>
                  <Text>charger</Text>
                  <Text>Radio</Text>
                  <Text>ecouter</Text>
                </View>


       <View>
             <ScrollView style={styles.categorieList}> 
             {
              categorieData.map((item) => (
                     <Categorie text={item.name} id={item.id} />

              ))
             }
                     

                     

                </ScrollView>

      </View>
               


                
            </View>

        <Footer/>
    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1
  },
      box:{
        width:"full",
        height:"80%",
      justifyContent:"space-between",
      alignItems:"stretch",
      flexDirection:"column"


      },
      categorieSelect:{
        paddingLeft:20,
        height:40,
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"flex-start",
        gap:10,
        borderBottomWidth:1,
        borderBottomColor:"black",
       
      },
      categorieList:{
        width:"full",
          paddingHorizontal:"5%",
         paddingTop:20
        
      }
})

export default CategorieScreen