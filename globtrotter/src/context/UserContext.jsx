import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("globetrotter_user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const createUser = async (username) => {
    try {
      const response = await api.post("/users", { username });
      const newUser = response.data;

      setUser(newUser);
      localStorage.setItem("globetrotter_user", JSON.stringify(newUser));

      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const updateScore = async (isCorrect) => {
    if (!user) return;

    try {
      const response = await api.put(`/users/${user._id}/score`, { isCorrect });
      const updatedUser = response.data;

      setUser(updatedUser);
      localStorage.setItem("globetrotter_user", JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, createUser, updateScore }}>
      {children}
    </UserContext.Provider>
  );
};
