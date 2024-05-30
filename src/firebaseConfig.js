// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBaYq-GSOOZuUaYgexiZP859UHN1pveY4",
  authDomain: "mydropbox-8e637.firebaseapp.com",
  projectId: "mydropbox-8e637",
  storageBucket: "mydropbox-8e637.appspot.com",
  messagingSenderId: "49196202568",
  appId: "1:49196202568:web:20385c8506c0660cfb367d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
