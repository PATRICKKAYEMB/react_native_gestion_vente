import {createContext, useContext, useState} from "react";
import {api} from "./axios";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [refreshToken, setRefreshToken] = useState(null);
    const [user, setUser] = useState({
        matricule: null,
        name: null,
        password:null,
        email:null,
        image_profil:null,
    });
    const login = async (matricule, password) => {
        const response = await api.post('/api/auth/login', {
            matricule,
            password
        });
        return response.data;
    }

    const handleSuccess = (data, navigation) => {
        setIsAuthenticated(true);
        setToken(data.jwt);
        setRefreshToken(data.refreshToken);
        SecureStore.setItemAsync("access_token", token.toString());
        SecureStore.setItemAsync("refresh_token", refreshToken.toString());
        console.log('=============')
        // navigation.replace("Home",{});
    }

    const checkIsAuthenticated = () => {
        const access_token = SecureStore.getItemAsync("access_token")
            .then(access_token => {
                if (access_token) {
                    setIsAuthenticated(true);
                }
            });
        return isAuthenticated;
    }
    const logout = async (navigation) => {
        setIsAuthenticated(false);
        SecureStore.deleteItemAsync("access_token");
        SecureStore.deleteItemAsync("refresh_token");
        // navigation.navigate("SignIn",{});

    }








    return (
        <AuthContext.Provider value={{checkIsAuthenticated, isAuthenticated,user, logout, handleSuccess, login, token, refreshToken}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth
