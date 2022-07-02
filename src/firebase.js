// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0Mn6nE5UQQeyJNJibKI7aI076vcYaAok",
  authDomain: "partners-in-crime-38309.firebaseapp.com",
  projectId: "partners-in-crime-38309",
  storageBucket: "partners-in-crime-38309.appspot.com",
  messagingSenderId: "712712296189",
  appId: "1:712712296189:web:2e58f52baf69f1e5905094"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);