// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//importar os recursos do firestore
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClVt38MSUZPN8OzaNz8k-Yto8itp8iGds",
  authDomain: "crud-simples-7fffc.firebaseapp.com",
  projectId: "crud-simples-7fffc",
  storageBucket: "crud-simples-7fffc.appspot.com",
  messagingSenderId: "767914588223",
  appId: "1:767914588223:web:c3d9c63a416f2c8fede08a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);