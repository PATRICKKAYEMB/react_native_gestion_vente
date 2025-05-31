import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
  import Navbar from '../../Components/Navbar';
  import Footer from '../../Components/Footer';
  import { Controller, useForm } from 'react-hook-form';
  import { useMutation } from '@tanstack/react-query';
  import { vendre_produit } from '../../api/apiVente';
  import Toast from 'react-native-toast-message';
  import { useRoute, useNavigation } from '@react-navigation/native';
  
  const VendreScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;
  
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    const mutation = useMutation({
      mutationFn: (formData) => vendre_produit({ data: formData, id }),
  
      onSuccess: (data) => {
        Toast.show({ type: 'success', text1: 'Vente réussie' });
        navigation.navigate('Historique');
      },
  
      onError: (error) => {
        Toast.show({
          type: 'error',
          text1: 'Échec vente',
          text2: error.message,
        });
      },
    });
  
    const onSubmit = (formData) => {
      mutation.mutate(formData);
    };
  
    return (
      <View style={styles.container}>
        <Navbar />
  
        <View style={styles.content}>
          <Text style={styles.title}>Formulaire de Vente</Text>


          <View style={styles.forms}>

        
  
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Client</Text>
                    <Controller
                      name="client_name"
                      control={control}
                      rules={{ required: 'Client obligatoire' }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          style={styles.input}
                          placeholder="Entrez le nom du client"
                         
                          onChangeText={onChange}
                          value={value}
                        
                        />
                      )}
                    />
                    {errors.client && (
                      <Text style={styles.error}>{errors.client.message}</Text>
                    )}
                  </View>
          
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Quantité</Text>
                    <Controller
                      name="quantite"
                      control={control}
                      rules={{ required: 'La quantité est obligatoire' }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          style={styles.input}
                          placeholder="Entrez la quantité"
                          onChangeText={onChange}
                          value={value}
                          
                          keyboardType="numeric"
                        />
                      )}
                    />
                    {errors.quantite && (
                      <Text style={styles.error}>{errors.quantite.message}</Text>
                    )}
                  </View>
          
                  <View style={styles.formGroup}>
                    <Text style={styles.label}>Date</Text>
                    <Controller
                      name="date_vente"
                      control={control}
                      rules={{ required: 'La date est obligatoire' }}
                     
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          style={styles.input}
                          placeholder="Entrez la date"
                          onChangeText={onChange}
                        
                          value={value}
                        />
                      )}
                    />
                    {errors.date_ajout && (
                      <Text style={styles.error}>{errors.date_ajout.message}</Text>
                    )}
                  </View>
          
                
                  
          
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit(onSubmit)}
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.buttonText}>Valider la vente</Text>
                    )}
                  </TouchableOpacity>

           </View>
        </View>
  
        <Footer />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      height:"100%",
      backgroundColor: '#f5f7fa',
    },
    content: {
      padding: 20,
      height:"78%",
    },
    forms:{
      marginTop:50,
      shadowColor:"black",
      shadowOpacity:1


    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: 15,
    },
    label: {
      marginBottom: 5,
      color: '#333',
      fontWeight: '600',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 10,
      backgroundColor: '#fff',
    },
    error: {
      color: 'red',
      marginTop: 3,
    },
    button: {
      marginTop: 20,
      backgroundColor: '#0D47A1',
      paddingVertical: 14,
      borderRadius: 10,
      alignItems: 'center',
      elevation: 2,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default VendreScreen;
  