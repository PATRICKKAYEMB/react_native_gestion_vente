import { createContext, useState, useContext } from "react";
import * as SecureStore from "expo-secure-store"




const AuthContext =createContext()

export const AuthProvider = ({children}) =>{
  const[token,setToken]= useState("")
  const[isAuthenticated,setIsAuthenticated] =useState(false)
  const [refreshToken,setRefreshToken] =useState("")

  const handleSuccess = async (data) => {
    const { access, refresh } = data;

    // ✅ Stocke les tokens
    await SecureStore.setItemAsync('access', access);
    await SecureStore.setItemAsync('refresh', refresh);

    setToken(data.jwt)
    setRefreshToken(data.refreshToken)

    // ✅ Met à jour l'état
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('access');
    await SecureStore.deleteItemAsync('refresh');
    setIsAuthenticated(false);
  };



  const checkIsAuthenticated = ()=>{
   const access_token = SecureStore.getItemAsync("token")

    .then(access_token =>{
        if (access_token) {
              setIsAuthenticated(true);
        }
    })

    return isAuthenticated
   }


  


   return(
    <AuthContext.Provider value={{handleSuccess,checkIsAuthenticated,logout,isAuthenticated,token,refreshToken}}>
          {children}
    </AuthContext.Provider>
   )

}

const useAuth = () =>{
    return useContext(AuthContext)
}
export default useAuth



