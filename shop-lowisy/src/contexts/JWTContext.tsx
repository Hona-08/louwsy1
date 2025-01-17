import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/auth';


// ----------------------------------------------------------------------

enum Types {
    Initial = 'INITIALIZE',
    Login = 'LOGIN',
    Logout = 'LOGOUT',
    Register = 'REGISTER',
}

type JWTAuthPayload = {
    [Types.Initial]: {
        isAuthenticated: boolean;
        user: AuthUser;
    };
    [Types.Login]: {
        user: AuthUser;
    };
    [Types.Logout]: undefined;
    [Types.Register]: {
        data: any;
    };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
    isAuthenticated: false,
    isInitialized: false,
    user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
    switch (action.type) {
        case 'INITIALIZE':
            return {
                isAuthenticated: action.payload.isAuthenticated,
                isInitialized: true,
                user: action.payload.user,
            };
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

        case 'REGISTER':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.data,
            };

        default:
            return state;
    }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
    children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
    const [state, dispatch] = useReducer(JWTReducer, initialState);

    useEffect(() => {
        const initialize = async () => {
            try {
                const accessToken =
                    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

                const response = await axios.get('/api/customers/auth/refresh-token');
                const { token, user } = response.data;

                if ((accessToken || token) && (isValidToken(accessToken) || isValidToken(token))) {
                    setSession(accessToken ?? token);

                    dispatch({
                        type: Types.Initial,
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    });
                } else {
                    dispatch({
                        type: Types.Initial,
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                  
                dispatch({
                    type: Types.Initial,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };

        initialize();
    }, []);

    const login = async (email: string, password: string) => {
        const response = await axios.post('/api/customers/auth/login', {
            email,
            password,
        });
        const { token, user } = response.data;

        setSession(token);

        dispatch({
            type: Types.Login,
            payload: {
                user,
            },
        });
    };

    const register = async (name: string, phone: string, email: string, password: string) => {
        const response = await axios.post('/api/customers/auth/register', {
            email,
            password,
            name,
            phone,
        });
        const { data } = response;

        dispatch({
            type: Types.Register,
            payload: {
                data,
            },
        });
    };

    const logout = async () => {
        const response = await axios.post('/api/customers/auth/logout');
        setSession(null);
        dispatch({ type: Types.Logout });
    };

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'jwt',
                login,
                logout,
                register,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };
