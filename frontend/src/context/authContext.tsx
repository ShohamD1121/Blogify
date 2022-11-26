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
  const [config, setConfig] = useState<string>("");

  const login = async (inputs: User): Promise<void> => {
    const res = await signIn(inputs, config);
    const token = res.data.access_token;
    const username: any = jwt(token);
    setCurrentUser(res.data);
    setUser(username.username);
  };

  const logout = async (): Promise<void> => {
    setCurrentUser(null);
  };

  useEffect(() => {
    if (currentUser && currentUser.hasOwnProperty("access_token")) {
      setConfig(currentUser.access_token);
      const token = currentUser.access_token;
      const username: any = jwt(token);
      setUser(username.username);
    }

    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser, config]);

  return (
    <AuthContext.Provider value={{ user, currentUser, login, logout, config }}>
      {children}
    </AuthContext.Provider>
  );
};
