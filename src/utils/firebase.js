// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyA9BQitsNuRPCf9Bg7yyQC_ENYNU2K3YqQ",
  authDomain: "tenedores-33d75.firebaseapp.com",
  databaseURL: "https://tenedores-33d75.firebaseio.com",
  projectId: "tenedores-33d75",
  storageBucket: "tenedores-33d75.appspot.com",
  messagingSenderId: "556680938122",
  appId: "1:556680938122:web:208297ec844f24912aa373"
};

// Initialize Firebase
export const initFirebase = initializeApp(firebaseConfig);