import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import ListProduits from '../../Components/ListProduits';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useQuery } from '@tanstack/react-query';
import { voir_produit } from '../../api/produitsApi';
import SpinnerScreen from '../exception/SpinnerScreen';
import NotFoundScreen from '../exception/NotFoundScreen';
import ErrorScreen from '../exception/ErrorScreen';

const ListeProduitsScreen = () => {
  const route = useRoute();
  const { id } = route.params;

  const { data,isLoading,error } = useQuery({
    queryKey: ['liste_produits', id],
    queryFn: () => voir_produit({ categorie: id }),
  });

  const listeProduits = data || [];

if(isLoading){
  return <SpinnerScreen/>
}

if(!data){
  return <NotFoundScreen/>
}

if (error){
  return <ErrorScreen/>
}


  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
      <ScrollView >
        <View style={styles.box}>
          {listeProduits.map((item) => (
            <ListProduits
              key={item.id}
              name={item.name}
              prix={item.prix}
              id={item.id}
              image={item.image}
              
            />
          ))}
        </View>
      </ScrollView>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  content:{
        height: "78%",
        paddingTop: 40,
        width: '100%',
        backgroundColor: '#F5F5F5',
  },
  box: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default ListeProduitsScreen;
