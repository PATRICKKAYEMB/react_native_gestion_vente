import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet, ScrollView, Image, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { Ajouter_produit } from "@/api/apiProduit"; // adapter selon votre structure
import { voir_categorie } from "@/api/apiCategorie";
import { useNavigation } from "@react-navigation/native";

const AjouterProduitPage = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [prix, setPrix] = useState("");
  const [quantite, setQuantite] = useState("");
  const [categorie, setCategorie] = useState(null);
  const [description, setDescription] = useState("");
  const [date_ajout, setDateAjout] = useState("");
  const [date_expiration, setDateExpiration] = useState("");
  const [image, setImage] = useState(null);

  // Récupérer les catégories
  const { data: categorieData } = useQuery({
    queryKey: ["categorie"],
    queryFn: voir_categorie,
  });

  // Mutation pour ajouter un produit
  const mutation = useMutation({
    mutationFn: Ajouter_produit,
    onSuccess: () => {
      Toast.show({ type: "success", text1: "Produit ajouté avec succès !" });
      navigation.navigate("Produits"); // Assurez-vous que la route "Produits" existe
    },
    onError: () => {
      Toast.show({ type: "error", text1: "Erreur lors de l'ajout" });
    },
  });

  // Fonction pour ouvrir la sélection d'image
  const pickImage = async () => {
    if (Platform.OS !== "web") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission refusée pour accéder aux images !");
        return;
      }
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  // Fonction pour envoyer le formulaire
  const onSubmit = () => {
    if (!name || !prix || !quantite || !categorie || !description || !date_ajout || !date_expiration || !image) {
      Toast.show({ type: "error", text1: "Veuillez remplir tous les champs." });
      return;
    }

    const form_data = new FormData();
    form_data.append("name", name);
    form_data.append("prix", prix);
    form_data.append("quantite", quantite);
    form_data.append("categorie", categorie);
    form_data.append("description", description);
    form_data.append("date_ajout", date_ajout);
    form_data.append("date_expiration", date_expiration);

    // Ajouter l'image (nécessite le bon format pour React Native)
    form_data.append("image", {
      uri: image.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    mutation.mutate(form_data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajouter un produit</Text>

      <Text style={styles.label}>Produit :</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nom du produit"
      />

      <Text style={styles.label}>Image :</Text>
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <Text>Choisir une image</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Catégorie :</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={categorie}
          onValueChange={(itemValue) => setCategorie(itemValue)}
        >
          <Picker.Item label="Choisir une catégorie" value={null} />
          {categorieData?.map((cat) => (
            <Picker.Item key={cat.id} label={cat.name} value={cat.id.toString()} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Prix :</Text>
      <TextInput
        style={styles.input}
        value={prix}
        onChangeText={setPrix}
        placeholder="Prix"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Quantité :</Text>
      <TextInput
        style={styles.input}
        value={quantite}
        onChangeText={setQuantite}
        placeholder="Quantité"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Date ajout :</Text>
      <TextInput
        style={styles.input}
        value={date_ajout}
        onChangeText={setDateAjout}
        placeholder="AAAA-MM-JJ"
      />

      <Text style={styles.label}>Date expiration :</Text>
      <TextInput
        style={styles.input}
        value={date_expiration}
        onChangeText={setDateExpiration}
        placeholder="AAAA-MM-JJ"
      />

      <Text style={styles.label}>Description :</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={description}
        onChangeText={setDescription}
        multiline
        placeholder="Description"
      />

      <Button title="Ajouter" onPress={onSubmit} />

      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F1F1F1",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 4,
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 4,
  },
  imagePicker: {
    height: 150,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default AjouterProduitPage;
