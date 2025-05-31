import { View, Text,StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import Title from '../Components/Title'
import { useQuery } from '@tanstack/react-query'
import { voir_notification } from '../api/apiNotification'

const NotificationScreen = () => {

    const {data}= useQuery({
        queryKey:["notification"],
        queryFn:voir_notification
    })
  
    const notifiactions = data || []
    return (
        <View  style={styles.container}>
            <Navbar/>
            <View style={styles.content}>
                    <Title title={"notification"}/>

                    <ScrollView style={styles.box}>  {
                        notifiactions.map((item)=>(

                            <View style={styles.boxText} key={item.id}>
                                    <Text style={styles.text} > {item.description} </Text>
                                    <Text>{item.date_alerte}</Text>
                            </View>
            
                        ))
                        }
                      
                    </ScrollView>
    
            </View>
            <Footer/>
         
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        container:{
            height:"100%"
    
        },
        content:{
            width:"full",
            height:"78%",
            paddingTop:10
        },
        box:{
            paddingHorizontal:10,
            paddingVertical:20,

        },
        boxText:{
            marginBottom:20
        },
        text:{
            fontSize:16,
            
        },
        text2:{
            fontSize:20,
            fontWeight:'bold',
            
        },


    })

export default NotificationScreen