import axios from 'axios';

import Cookies from 'js-cookie'
import { auth } from './firebase';


const api = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
});





const refreshToken = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken(true); 
      
      Cookies.set('token', token);
      
      return token;
    } else {
      throw new Error('No user is currently signed in.');
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};


api.interceptors.request.use(
  async (config) => {
    console.log('entered here alright',auth)
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      console.log("we also entered here as well")
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const newToken = await refreshToken();
        Cookies.set('token', newToken);  // Update the cookie with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token error:', refreshError);
        auth.signOut();
        Cookies.remove('token');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
