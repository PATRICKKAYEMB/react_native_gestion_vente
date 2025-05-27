import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

// Adresse IP locale de ton PC, pas 127.0.0.1
export const BaseUrl = "http://192.168.43.228:8000/api/";
export const BASEUrl = 'http://192.168.43.228:8000/api/';

export const api = axios.create({
  baseURL: BaseUrl,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('access');
        console.log("TOKEN TROUVÉ :", token); // 👈
      if (token) {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.error('Erreur dans l’intercepteur : ', err);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function connexion(data) {
  try {
    const response = await api.post("token/", data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    throw error;
  }
}
