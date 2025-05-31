import * as SecureStore from "expo-secure-store" 




export function logout(){
    console.log(SecureStore.getItem("access"))

    console.log("______________________refresh_______________________")
    console.log(SecureStore.getItem("refresh"))

    console.log("_____________________________________________")

    SecureStore.deleteItemAsync("access")
    SecureStore.deleteItemAsync("refresh")

    console.log(SecureStore.getItem("access"))
    console.log("_____________________refresh________________________")
    console.log(SecureStore.getItem("refresh"))
   
   
}
    