import { View, Text ,StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import Navbar from '../../Components/Navbar'
import Footer from '../../Components/Footer'
import Categorie from '../../Components/Categorie'
import { useQuery } from '@tanstack/react-query'
import { voir_categorie } from '../../api/apiCategorie'
import SpinnerScreen from '../exception/SpinnerScreen'
import NotFoundScreen from '../exception/NotFoundScreen'


const CategorieScreen = () => {

  const {data,isLoading,isError} =useQuery({
    queryKey:["categorie"],
    queryFn: voir_categorie



  })


  const categorieData = data || []

if (isLoading) {
  return <SpinnerScreen/>
}
 
if (isError) {
  return <NotFoundScreen/>
}
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
              categorieData.map((item,ids) => (
                     <Categorie text={item.name} id={item.id} key={ids} image={item.image} />

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
    height:"100%"
  },
      box:{
        width:"full",
        height:"78%",
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