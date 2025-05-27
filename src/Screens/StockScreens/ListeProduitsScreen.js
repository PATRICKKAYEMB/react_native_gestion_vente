import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
import ListProduits from '../../Components/ListProduits';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useQuery } from '@tanstack/react-query';
import { voir_produit } from '../../api/produitsApi';

const ListeProduitsScreen = () => {
  const route = useRoute();
  const { id } = route.params;

  const { data } = useQuery({
    queryKey: ['liste_produits', id],
    queryFn: () => voir_produit({ categorie: id }),
  });

  const listeProduits = data || [];

  return (
    <View>
      <Navbar />
      <ScrollView style={styles.container}>
        <View style={styles.box}>
          {listeProduits.map((item) => (
            <ListProduits
              key={item.id}
              name={item.name}
              prix={item.prix}
              id={item.id}
            />
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    width: '100%',
    backgroundColor: '#F5F5F5',
    height: '79%',
  },
  box: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

export default ListeProduitsScreen;
