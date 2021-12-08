
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const initailizeFirebaseApp = () => {
  initializeApp(firebaseConfig);
};

export default initailizeFirebaseApp;
