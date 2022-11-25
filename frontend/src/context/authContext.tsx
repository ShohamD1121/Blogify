import { createContext, useState, useEffect } from "react";
import jwt from "jwt-decode";
import { signIn } from "../api/Api";

interface User {
  username: string;
  password: string;
}

export const AuthContext = createContext<any>(null);

export const AuthContextProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user") as string) || null
  );
  const [user, setUser] = useState<string>("");

  const login = async (inputs: User): Promise<void> => {
    const res = await signIn(inputs);
    const token = res.data.access_token;
    const username: any = jwt(token);
    setCurrentUser(res.data);
    setUser(username.username);
  };

  const logout = async (): Promise<void> => {
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ user, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
