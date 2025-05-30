import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import Title from '../../Components/Title';
import { voir_vente } from '../../api/apiVente';
import { voir_categorie } from '../../api/apiCategorie';
import SpinnerScreen from '../exception/SpinnerScreen';
import ErrorScreen from '../exception/ErrorScreen';
import NotFoundScreen from '../exception/NotFoundScreen';

const HistoriqueScreen = () => {
  // 🎯 États principaux
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [sort, setSort] = useState('recent');
  const [categorie, setCategorie] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);

  // 🗓️ Gestion du DatePicker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isPickingStartDate, setIsPickingStartDate] = useState(true);

  const showDatePicker = (isStart) => {
    setIsPickingStartDate(isStart);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    isPickingStartDate ? setDateDebut(formattedDate) : setDateFin(formattedDate);
    hideDatePicker();
  };

  // 🔁 Récupération des données via React Query
  const { data: categoriesData } = useQuery({
    queryKey: ['categorie_liste'],
    queryFn: voir_categorie,
  });

  const { data: ventesData, isLoading:venteLoading,error:venteError } = useQuery({
    queryKey: ['historiqueVente', categorie, dateDebut, dateFin, sort],
    queryFn: () =>
      voir_vente({
        categorie,
        date_debut: dateDebut,
        date_fin: dateFin,
        sort,
      }),
  });

  const resetDateFin = () => {
   
      setDateFin('');   // Met la date de fin à vide
    
  };

  const resetDateDebut = () => {
   
    setDateDebut("")  // Met la date de fin à vide
  
};

  const categories = categoriesData || [];
  const ventes = ventesData || [];

  if (venteLoading){
    return <SpinnerScreen/>
  }

  if(venteError){
    return <ErrorScreen/>
  }

  if(!ventes){
    <NotFoundScreen/>
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Title title="Historique Ventes" />

        {/* 🔍 Filtres de recherche */}
<View   >
               
                      <View   style={styles.filtersContainer}>
                        <View style={styles.dateRow}>

                          <View style={styles.dateDebut} >
                                <TouchableOpacity
                                  onPress={() => showDatePicker(true)}
                                  style={styles.dateInput}
                                >
                                  <Text style={styles.textDate}>{dateDebut ? ` ${dateDebut}` : 'Date début'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={()=>resetDateDebut(false)}>
                               
                                <AntDesign name="delete" size={18} color="white" />
                                </TouchableOpacity>

                          </View>

                          <View style={styles.dateFin}>
                              <TouchableOpacity
                                onPress={() => showDatePicker(false)}
                                style={styles.dateInput}
                              >
                                <Text style={styles.textDate}>{dateFin ? ` ${dateFin}` : 'Date fin'}</Text>
                              </TouchableOpacity>

                              <TouchableOpacity onPress={()=>resetDateFin(false)}>
                              <AntDesign name="delete" size={18} color="white" />

                               </TouchableOpacity>


                          </View>
                         

                         
                        </View>
                        

                            <TouchableOpacity
                              onPress={() => setFilterVisible(!filterVisible)}
                              style={styles.filterButton}
                            >
                              <AntDesign name="filter" size={16} color="white" />
                              <Text style={styles.filterButtonText}>Filtrer</Text>
                            </TouchableOpacity>

                      </View>

                     

                     

               

                {/* 🔽 Filtres avancés */}
                {filterVisible && (
                  <View style={styles.filterOptions}>
                    <Picker
                      selectedValue={categorie}
                      onValueChange={setCategorie}
                      style={styles.picker}
                    >
                      <Picker.Item label="Catégorie" value="" />
                      {categories.map((cat) => (
                        <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
                      ))}
                    </Picker>

                    <Picker
                      selectedValue={sort}
                      onValueChange={setSort}
                      style={styles.picker}
                    >
                      <Picker.Item label="Récent" value="recent" />
                      <Picker.Item label="Ancien" value="ancien" />
                      <Picker.Item label="Montant décroissant" value="montant_desc" />
                      <Picker.Item label="Montant croissant" value="montant_asc" />
                    </Picker>
                  </View>
                )}
          </View>

        {/* 📋 Liste des ventes */}
        {venteLoading ? (
          <Text>Chargement...</Text>
        ) : (
          <FlatList
            data={ventes}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{ flex: 1, marginTop: 10 }}
            ListHeaderComponent={() => (
              <View style={[styles.row, styles.headerRow]}>
                <Text style={[styles.cell, styles.headerCell]}>Client</Text>
                <Text style={[styles.cell, styles.headerCell]}>Produit</Text>
                <Text style={[styles.cell, styles.headerCell]}>Quantité</Text>
                <Text style={[styles.cell, styles.headerCell]}>Date</Text>
              </View>
            )}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.cell}>{item.client}</Text>
                <Text style={styles.cell}>{item.produit_nom}</Text>
                <Text style={styles.cell}>{item.quantite}</Text>
                <Text style={styles.cell}>{item.date_vente}</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* 📅 Picker de date */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { width:"full",height:"100%" },
  content: { width:"full", height:"78%", paddingTop: 10,paddingHorizontal:4 },
  filtersContainer: {
    padding:4,
     justifyContent:"space-between",
     flexDirection:"row",
     width:"full",
      marginTop:20,
      alignItems:"center",
      
      position:"relative"
    
    },
    textDate:{
      fontSize:12,
      fontWeight:"bold",
      paddingVertical:3,
      paddingHorizontal:2
    },
  filterButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection:"row",
    gap:3,
    alignItems:"center",
    justifyContent:"center",
   
  },
  dateDebut:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    backgroundColor:"#007AFF",
    borderRadius:40,
    paddingHorizontal:5,
    paddingVertical:4,
    gap:3,
    borderRadius:6

  },
  dateFin:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    backgroundColor:"#007AFF",
    paddingHorizontal:5,
    paddingVertical:4,
    gap:3,
    borderRadius:6

  },
  filterButtonText: { color: 'white', fontWeight: '600', textAlign: 'center' },
  filterOptions: {

    backgroundColor: '#4B9CD3',
    position:"absolute",
    width:150,
    right:0,
    borderStartColor:"red",
    borderRadius: 6,
    top:"100%",
    zIndex:20
  },
  filtre:{
   
    flexDirection:"column",
    width:"100%",
    backgroundColor:"red"
  },
  picker: {
   
    marginBottom: 10,
    borderRadius: 4,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateInput: {
    
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 2,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerRow: {
    backgroundColor: '#eee',
    borderBottomWidth: 2,
    borderBottomColor: '#666',
  },
  headerCell: {
    fontWeight: 'bold',
  },
});

export default HistoriqueScreen;
