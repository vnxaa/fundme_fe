// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm4MwHMI29KXysSWLEI-1PVPcNWsBHwqY",
  authDomain: "fundme-68982.firebaseapp.com",
  projectId: "fundme-68982",
  storageBucket: "fundme-68982.appspot.com",
  messagingSenderId: "371380049748",
  appId: "1:371380049748:web:bb562e91105ebb9224dac1",
  measurementId: "G-MQY6KFYKBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
