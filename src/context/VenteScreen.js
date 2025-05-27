import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { venteProduit } from '@/api/apiVente' // adapte ce chemin
import { useNavigation, useRoute } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker'

const VentePage = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { id } = route.params  // récupère l'id du produit via params de navigation

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      client: '',
      quantite: '',
      date_vente: new Date(),
      total: '',
    }
  })

  const [showDatePicker, setShowDatePicker] = React.useState(false)

  const mutation = useMutation({
    mutationFn: venteProduit,
    onSuccess: () => {
      Alert.alert('Succès', 'Vente enregistrée')
      navigation.navigate('Produits')  // nom de l'écran produits dans ta stack
    },
    onError: (error) => {
      Alert.alert('Erreur', 'Une erreur est survenue lors de l\'enregistrement')
      console.error(error)
    }
  })

  const onSubmit = data => {
    // Prépare formData (FormData fonctionne sur RN aussi)
    const formData = new FormData()
    formData.append('client', data.client)
    formData.append('quantite', data.quantite)
    formData.append('date_vente', data.date_vente.toISOString().split('T')[0]) // format YYYY-MM-DD
    formData.append('total', data.total)
    formData.append('produit', id)

    mutation.mutate({ formData, id })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendre produit</Text>

      {/* Client */}
      <Text>Client :</Text>
      <Controller
        control={control}
        name="client"
        rules={{ required: 'Client requis' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.client && styles.errorInput]}
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="ID Client"
          />
        )}
      />
      {errors.client && <Text style={styles.errorText}>{errors.client.message}</Text>}

      {/* Quantité */}
      <Text>Quantité :</Text>
      <Controller
        control={control}
        name="quantite"
        rules={{ required: 'Quantité requise' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.quantite && styles.errorInput]}
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Quantité"
          />
        )}
      />
      {errors.quantite && <Text style={styles.errorText}>{errors.quantite.message}</Text>}

      {/* Date Vente */}
      <Text>Date de vente :</Text>
      <Controller
        control={control}
        name="date_vente"
        render={({ field: { value, onChange } }) => (
          <>
            <Button title={value ? value.toISOString().split('T')[0] : 'Choisir une date'} onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false)
                  if (selectedDate) onChange(selectedDate)
                }}
              />
            )}
          </>
        )}
      />

      {/* Total */}
      <Text>Total :</Text>
      <Controller
        control={control}
        name="total"
        rules={{ required: 'Total requis' }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors.total && styles.errorInput]}
            keyboardType="numeric"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Total"
          />
        )}
      />
      {errors.total && <Text style={styles.errorText}>{errors.total.message}</Text>}

      {/* Bouton soumettre */}
      {mutation.isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <Button title="Ajouter" onPress={handleSubmit(onSubmit)} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F1F1',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  errorInput: {
    borderColor: 'red'
  },
  errorText: {
    color: 'red',
  },
})

export default VentePage
