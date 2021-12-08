import { useEffect, useState } from "react";
import axios from "axios";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import initailizeFirebaseApp from "firebase/firebase.init";

// firebase config initize
initailizeFirebaseApp();
const useFirebase = () => {
  // user authentication state
  const [user, setUser] = useState(null);
  // loading state
  const [authLoading, setAuthLoading] = useState(true);
  // authentication error state
  const [authError, setAuthError] = useState(null);
  // firebase auth
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  //    user login with email and password
  const googleLogin = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      axios
        .post("https://jsonplaceholder.typicode.com/posts", {
          result,
        })
        .then((result) => {
          if (result.status === 201) {
            alert("succesfully responses");
          }
        });
      setUser(result.user);
      console.log(result.user);
      setAuthLoading(false);
      setAuthError(null);
    });
  };
  const loginUserWithEmail = (email, password) => {
    setAuthLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        console.log(result.user);
        setAuthLoading(false);
        setAuthError(null);
        axios
          .post("https://jsonplaceholder.typicode.com/posts", {
            result,
          })
          .then((result) => {
            if (result.status === 201) {
              alert("succesfully responses");
            }
          });
      })
      .catch((error) => setAuthError(error.message))
      .finally(() => setAuthLoading(false));
  };
  //    user registration
  const registerUser = (name, email, password) => {
    setAuthLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        setAuthLoading(false);
        setAuthError(null);
        axios
          .post("https://jsonplaceholder.typicode.com/posts", {
            result,
          })
          .then((result) => {
            if (result.status === 201) {
              alert("Successfully Respones");
            }
          });
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => setAuthLoading(false));
  };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser);
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });
    // eslint-disable-next-line
  }, []);

  return {
    user,
    authError,
    authLoading,
    registerUser,
    loginUserWithEmail,
    googleLogin,
  };
};

export default useFirebase;
