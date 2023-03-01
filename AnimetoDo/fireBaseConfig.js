import { initializeApp } from "firebase/app";
import  {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAnrLKuW5YvO5k85ajhCvvDIutLg1My730",
  authDomain: "api-anime-todo.firebaseapp.com",
  projectId: "api-anime-todo",
  storageBucket: "api-anime-todo.appspot.com",
  messagingSenderId: "68314524497",
  appId: "1:68314524497:web:9b7302ba57a6bbeb0e0170"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export {auth}