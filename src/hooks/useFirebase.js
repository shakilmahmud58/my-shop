import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    updateProfile,onAuthStateChanged,signOut } from "@firebase/auth";
import axios from "axios";
import { useEffect, useState } from "react";

import initializeAuth from "../Firebase/Initialize";


initializeAuth();


const useFirebase= ()=>{
    const checkadmin=(email)=>{
        axios.post('https://stark-citadel-01929.herokuapp.com/admincheck',{email: email}).then(res=>{
             
             if(res.data.length){
                setAdmin(true);
             }

        })
    }
    const auth = getAuth();
    const goggleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [admin, setAdmin] = useState(false)
    const [isLoading, setIsloading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    console.log(errorMessage);
    
    const googleSignIn = (handleRoute)=>{
        signInWithPopup(auth, goggleProvider).then(result=>{
            handleRoute();
            //setUser(result.user.displayName);
            console.log(result.user);
        })
        .catch((error)=>{
            const errorCode = error.code;
            const errorMsg = error.message;
            setErrorMessage(errorMsg);
        })
        .finally(()=>{
            setIsloading(false);
        })

        // return signInWithPopup(auth,goggleProvider);
    }
    const emailSignUp=(name,email, pass,handleroute)=>{
         createUserWithEmailAndPassword(auth,email,pass)
         .then(result=>{
             const user = result.user;
             if(user){
                updateProfile(auth.currentUser,{displayName:name})
                .then(()=>{
                    console.log(name);
                    setUser(name);
                    setUserEmail(email);

                })
                handleroute();
    
            }
         })

    }
    const emailSignIn=(email,pass,handleRoute)=>{
        signInWithEmailAndPassword(auth,email,pass)
         .then(result=>{
             setUser(result.user.displayName);
             setUserEmail(email);
             handleRoute();
             console.log(result);
         })
         .catch((error)=>{
            const errorCode = error.code;
            const errorMsg = error.message;
            setErrorMessage(errorMsg);
            //console.log(errorMsg);
        })
         .finally(()=>{
            setIsloading(false);
         })
    }
    const logOut=()=>{
        signOut(auth).then(()=>{
            setIsloading(true);
            setUser(null);
            setAdmin(false);
        }).finally(()=>{
            setIsloading(false);
        })
    }
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
             if(user){
                 setUser(user.displayName);
                 setUserEmail(user.email);
                 checkadmin(user.email);
             }
             setIsloading(false);
        })
    },[])
    return{
        user,
        admin,
        userEmail,
        isLoading,
        errorMessage,
        emailSignIn,
        emailSignUp,
        googleSignIn,
        logOut,
    }
}
export default useFirebase;