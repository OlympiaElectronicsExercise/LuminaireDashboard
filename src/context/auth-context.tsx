import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode,
} from "react";

type AuthContextType = {
    isLoggedIn: boolean;
    login: (email: string) => void;
    logout: () => void;
    email: string;
};

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    email: "",
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const storedEmail = sessionStorage.getItem("email");
        console.log(storedEmail);
        if (storedEmail) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const login = (email: string) => {
        sessionStorage.setItem("email", email);
        setIsLoggedIn(true);
        setEmail(email);
    };

    const logout = () => {
        sessionStorage.removeItem("email");
        setIsLoggedIn(false);
        setEmail("");
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, email, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
