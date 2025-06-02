import axios from 'axios';

        import * as SecureStore from 'expo-secure-store';
        
        
        export const BaseUrl = "http://192.168.81.228:8000/api/";
        export const BASEUrl = "http://192.168.81.228:8000";
        
        
        export const api = axios.create({
          baseURL: BaseUrl,
        });
        
        
        
        
        
        
        api.interceptors.request.use(
          async (config) => {
            const token = await SecureStore.getItemAsync('access');
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
              console.log('✅ Token ajouté dans les headers');
            } else {
              console.log('⚠️ Token introuvable');
            }
            return config;
          },
          (error) => Promise.reject(error)
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
        



