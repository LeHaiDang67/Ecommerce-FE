import { useContext, createContext, useEffect, useState } from 'react';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged,
    getIdToken,
} from 'firebase/auth';
import { auth } from '../heplers/firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [refreshedToken, setRefreshedToken] = useState(null);

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        // signInWithPopup(auth, provider);
        signInWithRedirect(auth, provider)
    };

    const logOut = () => {
        signOut(auth)
    }
    //Firebase automatically refreshes the ID token when it expires.The SDK will refresh the token about 5 minutes before it expires.
    //But some situations where you may need to manually refresh the token
    const refreshIdToken = async () => {
        const refreshedIdToken = await getIdToken(user, true);
        setRefreshedToken(refreshedIdToken);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setRefreshedToken(currentUser.stsTokenManager.refreshToken);
            //console.log('User', currentUser)
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
