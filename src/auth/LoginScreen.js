import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { connexion } from '../api/api';

connexion

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: connexion,
    onSuccess: async (data) => {
      if (data?.access && data?.refresh) {
        await SecureStore.setItemAsync("access", data.access);
        await SecureStore.setItemAsync("refresh", data.refresh);
        Toast.show({ type: "success", text1: "Connexion réussie" });
        navigation.navigate("Dashboard"); // remplace par ta vraie page
      } else {
        Toast.show({ type: "error", text1: "Tokens manquants" });
      }
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Échec de connexion", text2: error.message });
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <View style={styles.field}>
        <Text>Nom d'utilisateur</Text>
        <Controller
          control={control}
          name="username"
          rules={{ required: "Nom requis" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              editable={!mutation.isPending}
              placeholder="Nom d'utilisateur"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
      </View>

      <View style={styles.field}>
        <Text>Mot de passe</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: "Mot de passe requis" }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              editable={!mutation.isPending}
              secureTextEntry
              placeholder="Mot de passe"
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Se connecter</Text>
        )}
      </TouchableOpacity>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, flex: 1, justifyContent: 'center', backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center'
  },
  field: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginTop: 5
  },
  button: {
    backgroundColor: '#4B6BFB', padding: 15, borderRadius: 5, alignItems: 'center'
  },
  buttonText: {
    color: '#fff', fontWeight: 'bold'
  },
  error: {
    color: 'red', marginTop: 5
  }
});
