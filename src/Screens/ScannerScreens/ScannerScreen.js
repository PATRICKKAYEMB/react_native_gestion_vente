import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Linking, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { useNavigation } from '@react-navigation/native';

export default function BarcodeScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(''); // Garder pour l'affichage si besoin
  const navigation = useNavigation();

  // Pas besoin d'un useEffect vide ici.

  const handleBarCodeScanned = ({ type, data }) => {
    // Si déjà scanné, ne fait rien pour éviter des navigations multiples
    if (scanned) {
      return;
    }

    setScanned(true); // Désactive le scanner immédiatement

    // Les données du code-barres (data) sont ce que nous voulons passer comme ID
    const productId = data; // Supposons que les données scannées sont directement l'ID

    setScannedData(`Type: ${type}, Données: ${productId}`); // Mise à jour pour l'affichage temporaire

    Alert.alert(
      "Code scanné !",
      `Type: ${type}\nDonnées: ${productId}\n\nNaviguer vers les détails du produit ?`,
      [
        {
          text: "Annuler",
          onPress: () => setScanned(false), // Permet de scanner à nouveau si l'utilisateur annule
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            // Navigue vers l'écran DetailsProduitScreen en passant l'ID
            navigation.navigate("detailProduit", { id: productId });
            // Optionnel: réinitialiser le scanner si l'utilisateur revient à cet écran
            setScanned(false);
          }
        }
      ]
    );

    // Si c'est une URL, on peut toujours proposer de l'ouvrir
    if (productId.startsWith('http://') || productId.startsWith('https://')) {
      // Vous pouvez ajouter une option ici pour ouvrir le lien ou non.
      // Pour cet exemple, nous priorisons la navigation vers les détails du produit.
      // Linking.openURL(productId).catch(err => console.error('Failed to open URL', err));
    }
  };

  if (!permission) {
    return <Text>Demande d'accès à la caméra...</Text>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          Nous avons besoin de votre permission pour accéder à la caméra.
        </Text>
        <Button onPress={requestPermission} title="Accorder la permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        <Text style={styles.text}>Scanner un code-barres</Text>
        <View style={styles.cameraContainer}> {/* Renommé pour plus de clarté */}
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              // barcodeTypes: ["qr"] // Décommenter si vous voulez seulement les QR codes
            }}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <View style={styles.scanResultOverlay}> {/* Nouveau style pour la superposition */}
              <Text style={styles.scanResultText}>{scannedData}</Text>
              <Button title={'Scanner un autre code'} onPress={() => setScanned(false)} />
            </View>
          )}
        </View>

        {/* Le bouton Valider n'est plus nécessaire car la navigation est automatique après confirmation */}
        {/* Vous pourriez le garder si vous voulez une étape de validation manuelle */}
        {/* {scanned && (
          <TouchableOpacity style={styles.valider} onPress={() => navigation.navigate("detailProduit", { id: scannedData.split(', Données: ')[1] })}>
            <Text style={styles.textValider}>Valider la donnée scannée</Text>
          </TouchableOpacity>
        )} */}
      </View>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    
  },
  content: {
    height: "78%", // Prend l'espace restant entre Navbar et Footer
    alignItems: 'center', // Centre le contenu horizontalement
    justifyContent: 'flex-start', // Commence le contenu en haut
    paddingTop: 20,
  },
  cameraContainer: { // Renommé pour éviter la confusion avec le composant CameraView
    width: 300,
    height: 250,
    backgroundColor: '#ccc', // Couleur de fond pour voir la zone de la caméra
    borderRadius: 10,
    overflow: 'hidden', // Important pour que CameraView ne déborde pas
    marginTop: 20,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  valider: {
    marginTop: 15,
    paddingHorizontal: 20,
    marginHorizontal: "20%",
    paddingVertical: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  textValider: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
  },
  scanResultOverlay: { // Nouveau style pour la superposition du résultat
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
  },
  scanResultText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});