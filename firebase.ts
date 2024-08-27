
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyCsvrZxg-tcS4USGwJCk-n2akLMaT4F--E",
  authDomain: "fursa-f5930.firebaseapp.com",
  projectId: "fursa-f5930",
  storageBucket: "fursa-f5930.appspot.com",
  messagingSenderId: "135556072681",
  appId: "1:135556072681:web:c4f989420a4f558a685c78",
  measurementId: "G-GMM5NK2845"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);