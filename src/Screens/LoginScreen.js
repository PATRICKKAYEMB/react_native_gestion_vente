import { View, Text,StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native'

import { connexion } from '../api/api'
import { useMutation } from '@tanstack/react-query'
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { Controller, useForm } from 'react-hook-form'
import Entypo from '@expo/vector-icons/Entypo';
import useAuth from '../context/AuthContext'






const LoginScreen = ({navigation}) => {
    const {control,handleSubmit,formState:{errors}} = useForm()
    const {handleSuccess}= useAuth()
    
    const [status, setStatus] = useState(0)
    const [visibilityPassword,SetVisibilityPassword]= useState(false)

    const  mutation = useMutation({




        
        mutationFn:connexion,
        onSuccess: async (data)=>{
           handleSuccess(data)
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

            <View style={styles.InputBox}>
                    <View  style={styles.Input}>
                        <Controller
                        control={control}
                        name='username'
                        rules={{required:"Nom requis"}}
                        render={({  field : {onChange,value}}) =>(

                            <TextInput 
                        
                            placeholder='veiller entrer votre nom:'
                            onChangeText={onChange}
                            editable={!mutation.isPending}
                            value={value}
                            
                            /> ) }    
                        />
                        
                    </View>
                        {errors.username && <Text style={styles.error}>{errors.username.message}</Text>}

            </View>

           
           <View style={styles.InputPassword}>
                        <View style={styles.InputPassword2}>
                            <Controller
                           
                                control={control}
                                name='password'
                                rules={{required:"password requis"}}

                                render={({field:{onChange,value}}) =>(
                                    <TextInput  
                                    style={styles.password}
                                    placeholder='veiller entrer votre password:'
                                    onChangeText={onChange}
                                    value={value}
                                    secureTextEntry={visibilityPassword}
                                    editable={!mutation.isPending}
                                    />)}
                            />
                            <TouchableOpacity onPress={()=>(SetVisibilityPassword(!visibilityPassword))}> 
                                    <Entypo name="eye" size={24} color="black" />  
                            </TouchableOpacity> 
                        
                                
                        </View>
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
                        <ActivityIndicator color="#fff" size={30} />
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
       
        
        marginLeft: 20,
      },
      password:{
            flex:1
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
        paddingVertical:5,
        borderWidth:2,
        backgroundColor:"white",
       
        paddingHorizontal:8,
        borderRadius:18
    },
    InputBox:{
        marginBottom:30,
    },
    InputPassword2:{
        width:"90%",
        borderColor:"Brown",
        paddingVertical:5,
        paddingHorizontal:8,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        borderWidth:2,
        backgroundColor:"white",
      
        borderRadius:18
    },
    InputPassword:{
        marginBottom:20,
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