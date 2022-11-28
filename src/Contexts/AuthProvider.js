import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext()
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const deleteUserData = (uid) => {
        return getAuth().deleteUser(uid);
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth)
    }
    const googleSignupAndLogin = () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }
    const updateUserProfile = (name, imageURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: imageURL
        })
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
          
            setUser(currentUser)
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authInfo = { createUser, signIn, user, logOut, googleSignupAndLogin, updateUserProfile, loading, deleteUserData }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;