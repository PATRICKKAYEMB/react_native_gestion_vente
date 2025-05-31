import { createContext, useContext } from "react";









const AuthContext = createContext()

const UseAuth = () =>{
    return useContext(AuthContext)
}
