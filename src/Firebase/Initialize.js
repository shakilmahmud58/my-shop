import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyDercmku4M3MXBGTFfhwChLjeoAFKe3Efc",
  authDomain: "my-shop-9ab98.firebaseapp.com",
  projectId: "my-shop-9ab98",
  storageBucket: "my-shop-9ab98.appspot.com",
  messagingSenderId: "845310145027",
  appId: "1:845310145027:web:1479df011029b6fd6f9436"
};

const initializeAuth=()=>{
    initializeApp(firebaseConfig);
    getAnalytics(initializeApp(firebaseConfig));
}

export default initializeAuth;