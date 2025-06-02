import { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshToken, setRefreshToken] = useState("");

  // ✅ Vérification automatique au démarrage
  useEffect(() => {
    const checkToken = async () => {
      const access = await SecureStore.getItemAsync("access");
      const refresh = await SecureStore.getItemAsync("refresh");

      if (access) {
        setToken(access);
        setRefreshToken(refresh);
        setIsAuthenticated(true);
      }
    };

    checkToken();
  }, []);

  const handleSuccess = async (data) => {
    const { access, refresh } = data;

    await SecureStore.setItemAsync("access", access);
    await SecureStore.setItemAsync("refresh", refresh);

    setToken(access);
    setRefreshToken(refresh);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("access");
    await SecureStore.deleteItemAsync("refresh");
    setIsAuthenticated(false);
    setToken("");
    setRefreshToken("");
  };

  // Cette fonction devient facultative avec useEffect
  const checkIsAuthenticated = async () => {
    const access_token = await SecureStore.getItemAsync("access");
    if (access_token) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        handleSuccess,
        checkIsAuthenticated,
        logout,
        isAuthenticated,
        token,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
