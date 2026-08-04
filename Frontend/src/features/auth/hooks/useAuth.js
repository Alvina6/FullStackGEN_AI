import { useContext } from "react";

import AuthContext from "../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await login({ email, password });

      if (!data?.user) {
        throw new Error("Login failed: no user returned from the server.");
      }

      setUser(data.user);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);

    try {
      const data = await register({ username, email, password });

      if (!data?.user) {
        throw new Error("Registration failed: no user returned from the server.");
      }

      setUser(data.user);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handlelogout = async () => {
    setLoading(true);

    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogin, handleRegister, handlelogout };
};
