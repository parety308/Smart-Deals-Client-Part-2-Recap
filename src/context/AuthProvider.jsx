import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';
import { ToastContainer } from 'react-toastify';
const googleProvider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(email, password);
    }
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

const updateUser=(user)=>{
    return updateProfile(auth.currentUser,{
        displayName:user.displayName,
        photoURL:user.photoURL
    });
}


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if(currentUser){
                const loggedUser={email:currentUser.email};
                fetch("http://localhost:3000/getToken",{
                    method:"POST",
                    headers:{
                        'content-type':"application/json"
                    },
                    body:JSON.stringify(loggedUser)})
                    .then(res=>res.json())
                    .then(data=>{
                        console.log('after getting token',data);
                        localStorage.setItem('token',data.token)
                    })
            }
            setLoading(false);
        })

        return () => {
            unsubscribe()
        }
    }, []);

    const authInfo = {
        createUser,
        signInUser,
        signInWithGoogle,
        user,
        setUser,
        signOutUser,
        updateUser,
        loading
    }

    return (
        <div>
            
            <AuthContext.Provider value={authInfo}> 
                <ToastContainer />
                  {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;