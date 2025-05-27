import React from 'react'
import { View, Text, TouchableOpacity, Image, Alert, ScrollView, StyleSheet } from 'react-native'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Detail_produit, supprimer_produit } from '@/api/apiProduit'
import { toast } from 'react-native-toast-message' // alternative toast en React Native
import { FontAwesome } from '@expo/vector-icons'  // pour icône trash

const DetailProduit = () => {
  const route = useRoute()
  const navigation = useNavigation()
  const { id } = route.params

  const { data: detail_produit = {} } = useQuery({
    queryKey: ['id_produit', id],
    queryFn: () => Detail_produit(id),
  })

  const mutate = useMutation({
    mutationFn: ({ id }) => supprimer_produit(id),
    onSuccess: () => {
      navigation.navigate('Produits') // adapte selon ton stack
      toast.show({
        type: 'success',
        text1: 'Le produit a été supprimé',
      })
    },
  })

  const onSubmit = (id) => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment supprimer ce produit ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', onPress: () => mutate.mutate({ id }) },
      ],
      { cancelable: true }
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détail produit</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.redButton]} onPress={() => onSubmit(id)}>
          <FontAwesome name="trash" size={16} color="white" />
          <Text style={styles.buttonText}> Supprimer</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.redButtonLight]}
          onPress={() => navigation.navigate('AjouterPerte', { id: detail_produit.id })}
        >
          <Text style={styles.buttonText}>Ajouter perte</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.button, styles.blueButton]}
          onPress={() => navigation.navigate('Vente', { id: detail_produit.id })}
        >
          <Text style={styles.buttonText}>Vendre</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.greenButton]}
          onPress={() => navigation.navigate('Approvisionner', { id: detail_produit.id })}
        >
          <Text style={styles.buttonText}>Approvisionner</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.yellowButton]}
          onPress={() => navigation.navigate('ModifierProduit', { id: detail_produit.id })}
        >
          <Text style={styles.buttonText}>Modification</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailCard}>
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Produit:</Text>
            <Text style={styles.value}>{detail_produit.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Catégorie:</Text>
            <Text style={styles.value}>{detail_produit.categorie}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Prix:</Text>
            <Text style={styles.value}>{detail_produit.prix}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Stock:</Text>
            <Text style={styles.value}>{detail_produit.quantite}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <View style={[styles.statusBadge, detail_produit.status === 'active' ? styles.statusActive : styles.statusInactive]}>
              <Text style={styles.statusText}>{detail_produit.status}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date ajout:</Text>
            <Text style={styles.value}>{detail_produit.date_ajout}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Date expiration:</Text>
            <Text style={styles.value}>{detail_produit.date_expiration}</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <Text style={[styles.label, { textAlign: 'center' }]}>Description:</Text>
            <Text style={styles.description}>{detail_produit.description}</Text>
          </View>
        </View>

        {detail_produit.image_url ? (
          <Image source={{ uri: detail_produit.image_url }} style={styles.image} resizeMode="contain" />
        ) : (
          <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}>
            <Text style={{ color: 'white' }}>Pas d'image</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F1F1F1',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    elevation: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  redButton: {
    backgroundColor: '#e53e3e',
  },
  redButtonLight: {
    backgroundColor: '#f56565',
  },
  blueButton: {
    backgroundColor: '#4299e1',
  },
  greenButton: {
    backgroundColor: '#48bb78',
  },
  yellowButton: {
    backgroundColor: '#ecc94b',
  },
  detailCard: {
    backgroundColor: 'white',
    marginTop: 16,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    height: 320,
  },
  infoSection: {
    flex: 2,
    backgroundColor: '#2b6cb0',
    padding: 16,
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    color: 'white',
    fontSize: 16,
  },
  value: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  statusBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusActive: {
    backgroundColor: '#48bb78',
  },
  statusInactive: {
    backgroundColor: '#a0aec0',
  },
  statusText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  description: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    flex: 3,
    backgroundColor: '#2b6cb0',
  },
})

export default DetailProduit
