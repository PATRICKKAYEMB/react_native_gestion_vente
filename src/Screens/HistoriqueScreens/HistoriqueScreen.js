import React, { useState } from 'react';
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

  const { data: ventesData, isLoading } = useQuery({
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

  return (
    <SafeAreaView style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Title title="Historique Ventes" />

        {/* 🔍 Filtres de recherche */}
<View  >
                <View>
                      <View style={styles.filtersContainer}>
                        <View style={styles.dateRow}>
                          <TouchableOpacity
                            onPress={() => showDatePicker(true)}
                            style={styles.dateInput}
                          >
                            <Text>{dateDebut ? `Début : ${dateDebut}` : 'Date début'}</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => showDatePicker(false)}
                            style={styles.dateInput}
                          >
                            <Text>{dateFin ? `Fin : ${dateFin}` : 'Date fin'}</Text>
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                          onPress={() => setFilterVisible(!filterVisible)}
                          style={styles.filterButton}
                        >
                          <Text style={styles.filterButtonText}>Filtrer</Text>
                        </TouchableOpacity>
                      </View>

                      <TouchableOpacity onPress={()=>resetDateFin(false)}>
                        <Text> fin </Text>

                      </TouchableOpacity>

                      <TouchableOpacity onPress={()=>resetDateDebut(false)}>
                      <Text> debut </Text>

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
        {isLoading ? (
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
  container: { flex: 1 },
  content: { flex: 1, paddingTop: 10 },
  filtersContainer: { padding: 10 },
  filterButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
  },
  filterButtonText: { color: 'white', fontWeight: '600', textAlign: 'center' },
  filterOptions: {
    backgroundColor: '#4B9CD3',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  filtre:{
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row"
  },
  picker: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 4,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 10,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
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
