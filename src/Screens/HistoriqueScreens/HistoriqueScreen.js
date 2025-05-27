import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput,SafeAreaView  } from 'react-native'
import React,{useState}from 'react'
import Navbar from '../../Components/Navbar'
import { Picker } from '@react-native-picker/picker';
import { useQuery } from '@tanstack/react-query';
import Footer from '../../Components/Footer'
import { voir_vente } from '../../api/apiVente';
import { voir_categorie } from '../../api/apiCategorie';


const HistoriqueScreen = () => {

    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');
    const [sort, setSort] = useState('recent');
    const [filterVisible, setFilterVisible] = useState(false);
    const [categorie, setCategorie] = useState('');
  
    const { data: categoriesData } = useQuery({
       queryKey: ['categorie_liste'],
       queryFn: voir_categorie
    });
    const { data: ventesData,isLoading } = useQuery({
            queryKey: ['historiqueVente', categorie, dateDebut, dateFin, sort],
            queryFn:   () =>
            voir_vente({
              categorie,
              date_debut: dateDebut,
              date_fin: dateFin,
              sort,
            }),
    }
     
    
    );
  
    const categories = categoriesData || [];
    const ventes = ventesData || [];
   
  return (
    <SafeAreaView style={Styles.container}>
    
            <Navbar/>

        <View style={Styles.content}>
            <Text style={Styles.text}>historique Ventes</Text>



            <View style={Styles.filtersContainer}>
        <TextInput
          placeholder="Date début (YYYY-MM-DD)"
          value={dateDebut}
          onChangeText={setDateDebut}
          style={Styles.input}
        />
        <TextInput
          placeholder="Date fin (YYYY-MM-DD)"
          value={dateFin}
          onChangeText={setDateFin}
          style={Styles.input}
        />
        <TouchableOpacity onPress={() => setFilterVisible(!filterVisible)} style={Styles.filterButton}>
          <Text style={Styles.filterButtonText}>Filtrer</Text>
        </TouchableOpacity>
      </View>

      {filterVisible && (
        <View style={Styles.filterOptions}>
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

          <Picker selectedValue={sort} onValueChange={setSort} style={Styles.picker}>
            <Picker.Item label="Récent" value="recent" />
            <Picker.Item label="Ancien" value="ancien" />
            <Picker.Item label="Montant décroissant" value="montant_desc" />
            <Picker.Item label="Montant croissant" value="montant_asc" />
          </Picker>
        </View>
      )}


           {isLoading?<Text>chargement...</Text>:
                <FlatList
                data={ventes}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 100 }}
                style={{ flex: 1, marginTop: 10 }}
                renderItem={({ item }) => (
                  <View style={Styles.row}>
                    <Text style={Styles.cell}>{item.client}</Text>
                    <Text style={Styles.cell}>{item.produit_nom}</Text>
                   
                    <Text style={Styles.cell}>{item.quantite}</Text>
                    <Text style={Styles.cell}>{item.date_vente}</Text>
                  
                  </View>
                )}
                ListHeaderComponent={() => (
                  <View style={[Styles.row, Styles.headerRow]}>
                    <Text style={[Styles.cell, Styles.headerCell]}>Client</Text>
                    <Text style={[Styles.cell, Styles.headerCell]}>Produit</Text>
                  
                    <Text style={[Styles.cell, Styles.headerCell]}>Quantité</Text>
                    <Text style={[Styles.cell, Styles.headerCell]}>Date de vente</Text>
                   
                  </View>
                )}  />

           } 
           
      
   
        </View>

            <Footer/>
 </SafeAreaView>
  
  )
}

const Styles = StyleSheet.create({
    container:{
        flex:1
    },
    content:{
        width:"full",
        height:"80%",
        paddingTop:10
    },
    text:{
        textAlign:"center",
        fontSize:20,
        fontWeight:"condensedBold"
    },

    row: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal:3,
       
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
        paddingHorizontal:3,
      },
      headerCell: {
        fontWeight: 'bold',
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
})

export default HistoriqueScreen

