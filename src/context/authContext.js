import useFirebase from 'hooks/useFirebase';
import React, { createContext } from 'react';
export const AuthProvider = createContext();
const AuthContext = ({children}) => {
    const allAuth = useFirebase()
    return (
        <AuthProvider.Provider value={allAuth}>
            {children}
        </AuthProvider.Provider>
    );
};

export default AuthContext;