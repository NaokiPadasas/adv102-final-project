import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    createUserWithEmailAndPassword, 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut} from "firebase/auth";
import{
    addDoc, 
    collection, 
    getFirestore } from "firebase/firestore";
import { useId } from "react";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCKTp0wVNYfHB3vfUsmaPVNBBejpcu1-zg",
  authDomain: "netflix-clone-8099f.firebaseapp.com",
  projectId: "netflix-clone-8099f",
  storageBucket: "netflix-clone-8099f.appspot.com",
  messagingSenderId: "926962553165",
  appId: "1:926962553165:web:7d2293cf202538aafc6704",
  measurementId: "G-SXCRR8PLRX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async (email, password)=>{
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};