import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase/firebase.config';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    const logOutUser = () => {
        setLoading(true);
        return signOut(auth);
    };
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setLoading(false);
});
    return () => {
    unsubscribe();
    }
}, []);
    const authInfo = {
        user,
        loading,
        setUser,
        setLoading,
        registerUser,
        signInUser,
        signInGoogle,
        logOutUser,
        updateUserProfile
    };
    return <AuthContext value={authInfo}>{children}</AuthContext>
};

export default AuthProvider;