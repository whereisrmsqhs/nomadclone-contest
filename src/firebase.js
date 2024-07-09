import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHBAA5aunQ-rdfSm6b1pMzbr45L-WaAks",
  authDomain: "nwitter-reloaded-176d7.firebaseapp.com",
  projectId: "nwitter-reloaded-176d7",
  storageBucket: "nwitter-reloaded-176d7.appspot.com",
  messagingSenderId: "875459930361",
  appId: "1:875459930361:web:6b70e21fc8c8c7da82da28",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
