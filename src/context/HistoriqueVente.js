import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useQuery } from '@tanstack/react-query';
import { voir_vente } from '@/api/apiVente';
import { voir_categorie } from '../api/apiCategorie';


const HistoriqueVenteScreen = () => {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [sort, setSort] = useState('recent');
  const [filterVisible, setFilterVisible] = useState(false);
  const [categorie, setCategorie] = useState('');

  const { data: categoriesData } = useQuery({
   queryKey: ['categorie_liste'],
     queryFn : voir_categorie,
  });

  const { data: ventesData } = useQuery(
    ['historiqueVente', categorie, dateDebut, dateFin, sort],
    () =>
      voir_vente({
        categorie,
        date_debut: dateDebut,
        date_fin: dateFin,
        sort,
      }),
  );

  const categories = categoriesData || [];
  const ventes = ventesData || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Ventes</Text>

      {/* Filtres */}
      <View style={styles.filtersContainer}>
        <TextInput
          placeholder="Date début (YYYY-MM-DD)"
          value={dateDebut}
          onChangeText={setDateDebut}
          style={styles.input}
        />
        <TextInput
          placeholder="Date fin (YYYY-MM-DD)"
          value={dateFin}
          onChangeText={setDateFin}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)} style={styles.filterButton}>
          <Text style={styles.filterButtonText}>Filtrer</Text>
        </TouchableOpacity>
      </View>

      {filterVisible && (
        <View style={styles.filterOptions}>
          <Picker
            selectedValue={categorie}
            onValueChange={(itemValue) => setCategorie(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Catégorie" value="" />
            {categories.map((cat) => (
              <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
            ))}
          </Picker>

          <Picker selectedValue={sort} onValueChange={setSort} style={styles.picker}>
            <Picker.Item label="Récent" value="recent" />
            <Picker.Item label="Ancien" value="ancien" />
            <Picker.Item label="Montant décroissant" value="montant_desc" />
            <Picker.Item label="Montant croissant" value="montant_asc" />
          </Picker>
        </View>
      )}

      {/* Liste des ventes */}
      <FlatList
        data={ventes}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{ flex: 1, marginTop: 10 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.client}</Text>
            <Text style={styles.cell}>{item.produit_nom}</Text>
            <Text style={styles.cell}>{item.prix_produit} €</Text>
            <Text style={styles.cell}>{item.quantite}</Text>
            <Text style={styles.cell}>{item.date_vente}</Text>
            <Text style={styles.cell}>{item.total} €</Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={[styles.row, styles.headerRow]}>
            <Text style={[styles.cell, styles.headerCell]}>Client</Text>
            <Text style={[styles.cell, styles.headerCell]}>Produit</Text>
            <Text style={[styles.cell, styles.headerCell]}>Prix</Text>
            <Text style={[styles.cell, styles.headerCell]}>Quantité</Text>
            <Text style={[styles.cell, styles.headerCell]}>Date de vente</Text>
            <Text style={[styles.cell, styles.headerCell]}>Total</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#003366', marginBottom: 12 },
  filtersContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 },
  input: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  filterButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  filterButtonText: { color: 'white', fontWeight: '600' },
  filterOptions: { backgroundColor: '#4B9CD3', padding: 10, borderRadius: 6, marginBottom: 10 },
  picker: { backgroundColor: 'white', marginBottom: 10, borderRadius: 4 },
  row: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  headerRow: { backgroundColor: '#003366' },
  cell: { flex: 1, color: '#000' },
  headerCell: { color: '#fff', fontWeight: 'bold' },
});

export default HistoriqueVenteScreen;
