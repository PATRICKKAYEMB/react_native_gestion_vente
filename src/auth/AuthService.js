import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export const getToken = async () => {
  return await AsyncStorage.getItem('access');
};

export const decodeToken = async () => {
  const token = await getToken();
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const isAuthenticated = async () => {
  const token = await getToken();
  return !!token;
};

export const logout = async () => {
  await AsyncStorage.removeItem('access');
  await AsyncStorage.removeItem('refresh');
};
