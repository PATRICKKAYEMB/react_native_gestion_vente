import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from '../Screens/LoginScreen';
import ScannerScreen from '../Screens/ScannerScreens/ScannerScreen';

import CategorieScreen from '../Screens/StockScreens/CategorieScreen';
import DetailsProduitScreen from '../Screens/StockScreens/DetailsProduitScreen';
import { Dimensions } from 'react-native';
import ListeProduitsScreen from '../Screens/StockScreens/ListeProduitsScreen';

import HistoriqueScreen from '../Screens/HistoriqueScreens/HistoriqueScreen';
import VendreScreen from '../Screens/StockScreens/VendreScreen';
import NotificationScreen from '../Screens/NotificationScreen';


import useAuth from '../context/AuthContext';








const Stack = createStackNavigator(); 

 const  AppNav = ({onReady})=> {
  const {isAuthenticated}=useAuth()
    if (!isAuthenticated) {

      return (
        <NavigationContainer onReady={onReady}>
             <Stack.Navigator initialRouteName="Login">
         
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
  
        </NavigationContainer>
      )
      
    }

 else {
        return (
          <NavigationContainer onReady={onReady}>
          
            <Stack.Navigator initialRouteName="scanner">

            <Stack.Screen 
              name="scanner"
              component={ScannerScreen}
              options={{ headerShown: false }} />
            
              <Stack.Screen 
              name='Historique'
              component={HistoriqueScreen}
              options={{ headerShown: false }} />


              <Stack.Screen
                name="listeProduits"
                component={ListeProduitsScreen}
                options={{ headerShown: false }}
              
              />

            <Stack.Screen 
            name='venteProduit'
            component={VendreScreen}
            options={{ headerShown: false }}
            />

            <Stack.Screen 
            name="notification"
            component={NotificationScreen}
            options={{ headerShown: false }}
            />

              <Stack.Screen 
              name='stock'
              component={CategorieScreen}
              options={{headerShown:false}} />

              <Stack.Screen 
              name='detailProduit'
              component={DetailsProduitScreen}
              options={{headerShown:false}} />

             
            </Stack.Navigator>
          </NavigationContainer>
        );

}

   
}

export default AppNav;
