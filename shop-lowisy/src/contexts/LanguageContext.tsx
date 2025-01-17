import React, { createContext, useState } from 'react';
import axios from 'axios';
// import { setLanguageCodeHeader } from './../utils/axios';

type LanguageContextType = {
    languageCode: string;
    setLanguageCode: (code: string) => void;
};

export const LanguageContext = createContext<LanguageContextType>({
    languageCode: 'en',
    setLanguageCode: () => { },
});

export const LanguageProvider: React.FC = ({ children }) => {
    //const [languageCode, setLanguageCode] = useState(typeof window !== 'undefined' ? localStorage.getItem('lang') : 'en');
    const [languageCode, setLanguageCode] = useState('en');
    // Update the language code and set it in Axios headers
    const handleLanguageChange = (code: string) => {
        setLanguageCode(code);
        // setLanguageCodeHeader(code)
        axios.defaults.headers.common['Accept-Language'] = code;
    };

    const contextValue: LanguageContextType = {
        languageCode,
        setLanguageCode: handleLanguageChange,
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            {children}
        </LanguageContext.Provider>
    );
};
