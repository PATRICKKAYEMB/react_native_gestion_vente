import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Title = ({title}) => {
  return (
   <>
   <Text style={styles.text}>{title}</Text>
   
   </>
      
   
  )
}


const styles = StyleSheet.create({
    text:{
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
        color:"orange"
    },
})

export default Title