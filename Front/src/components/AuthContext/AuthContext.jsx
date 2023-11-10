// AuthContext.js
import React, { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Defina o estado de autenticação inicial e o redutor
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

// Crie um redutor para gerenciar as ações de autenticação
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
}

// Estado de autenticação inicial
const initialState = {
    isAuthenticated: false,
    user: null,
};

export default AuthContext;
