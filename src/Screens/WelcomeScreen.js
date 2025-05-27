import React from 'react'
import { Text, View ,StyleSheet, TouchableOpacity} from 'react-native'



const welcomeScreen =({navigation})=>{
    return(
        <View style={styles.container}>
    
      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Gérez vos ventes facilement et rapidement</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
 
    ) 


       
       

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
      marginBottom: 40,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
  });
  
export default welcomeScreen;