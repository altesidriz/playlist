import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDMblsv-IIqyARFkOvOFR9qfZkEPubUAmU",
  authDomain: "video-app-1dae7.firebaseapp.com",
  projectId: "video-app-1dae7",
  storageBucket: "video-app-1dae7.appspot.com",
  messagingSenderId: "153240680933",
  appId: "1:153240680933:web:1d72a5e2d22f6a5c52d70c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;