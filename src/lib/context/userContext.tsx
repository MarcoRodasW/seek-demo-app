import Cookies from "js-cookie";
import { type ReactNode, createContext, useContext, useState } from "react";
import { defaultUser } from "../shared/mocks/user.mock";
interface AuthContextType {
	isAuthenticated: boolean;
	login: (username: string, password: string) => boolean;
	logout: () => void;
	user: typeof defaultUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!Cookies.get("token"),
	);

	const login = (username: string, password: string): boolean => {
		if (username === defaultUser.email && password === defaultUser.password) {
			const mockToken = btoa(
				JSON.stringify({ username, exp: Date.now() + 3600000 }),
			);
			Cookies.set("token", mockToken, { expires: 1 });
			setIsAuthenticated(true);
			return true;
		}
		return false;
	};

	const logout = () => {
		Cookies.remove("token");
		setIsAuthenticated(false);
	};

	const user = isAuthenticated ? defaultUser : null;

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
