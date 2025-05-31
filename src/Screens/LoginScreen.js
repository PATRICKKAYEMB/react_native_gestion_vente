import { View, Text,StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'

import { connexion } from '../api/api'
import { useMutation } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { Controller, useForm } from 'react-hook-form'






const LoginScreen = ({navigation}) => {
    const {control,handleSubmit,formState:{errors}} = useForm()

    
    const [status, setStatus] = useState(0)

    const  mutation = useMutation({




        
        mutationFn:connexion,
        onSuccess: async (data)=>{
            if(data?.access && data?.refresh){
                await SecureStore.setItemAsync("access",data.access)
                await SecureStore.setItemAsync("refresh",data.refresh)
                Toast.show({ type: "success", text1: "Connexion réussie" });
                navigation.navigate("home")
            }
        },
        onError: (error) => {
            Toast.show({
              type: "error",
              text1: "Échec de connexion",
              text2: error.message,
              
            });

           setStatus(error.status) 
          
          }
          
          
    })
   

    function onSubmit (data){
        mutation.mutate(data)
    } 
  return (
   <View style={styles.container}>


        <View style={styles.container2} >
            <Text style={styles.Titre} >Login</Text>

            <View>
                <Controller control={control}
                name='username'
                rules={{required:"Nom requis"}}
                render={({  field : {onChange,value}}) =>(

                    <TextInput style={styles.Input}
                     placeholder='veilleur votre nom:'
                     onChangeText={onChange}
                     editable={!mutation.isPending}
                       value={value}

                     /> ) }    
                />
                
                {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}
            </View>
            <View>
                <Controller
                    control={control}
                    name='password'
                    rules={{required:"password requis"}}

                    render={({field:{onChange,value}}) =>(
                        <TextInput style={styles.InputPassword} 

                         placeholder='veilleur votre nom:'
                         onChangeText={onChange}
                         value={value}
                         secureTextEntry
                         editable={!mutation.isPending}
                         />)}
                />
                 {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

            </View>
           
           {
            status === 401 && <Text style={styles.errorMessage} >nom ou mot de passe incorrect</Text>
           }
            

             <TouchableOpacity style={styles.Button}
              onPress={handleSubmit(onSubmit)}
              disabled={mutation.isPending}>
                {
                    mutation.isPending? (
                        <ActivityIndicator color="#fff"  />
                    ):(
                        <Text style={styles.TextButton}>connexion</Text>
                    )
                }
                
            </TouchableOpacity>

        </View>
   </View>
   
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"white",
        position:"relative"
    },
    container2:{
        height:"55%",
        paddingTop:50,
        paddingLeft:30,
        backgroundColor:"#0D47A1",
        bottom:0,
        width:"100%",
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        position:"absolute"

    },
    error: {
        color: 'red',
        marginBottom: 10,
        marginLeft: 5,
      },
      
    Titre:{
        color:"orange",
        fontSize:30,
        fontWeight:"bold",
        marginBottom:30
    },
    Input:{
        width:"90%",
        borderColor:"Brown",
        padding:15,
        borderWidth:2,
        backgroundColor:"white",
        marginBottom:30,
        borderRadius:18
    },
    InputPassword:{
        width:"90%",
        borderColor:"Brown",
        padding:15,
        borderWidth:2,
        backgroundColor:"white",
        marginBottom:7,
        borderRadius:18
    },
    
    Button:{
        width:"90%",
        backgroundColor:"orange",
        padding:10,
        marginBottom:35,
        borderRadius:18
    },
    TextButton:{
        textAlign:"center",
        color:"#fff",
        fontSize:22,
        fontWeight:"bold"
    },
    errorMessage:{

        color:"white",
        paddingLeft:40,
        marginBottom:10

        

    }

})


export default LoginScreen