import React from 'react';

export const DarkModeContext = React.createContext(/* default value, if any */);

export default DarkModeContext;
export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = React.useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};
