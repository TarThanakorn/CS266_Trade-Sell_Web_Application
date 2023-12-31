import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await axios.post("/auth/login", inputs);
      const userData = res.data;
  
      // เพิ่ม isAdmin ใน userData ถ้ามีข้อมูลใน response
      if (userData.status !== undefined) {
        userData.isAdmin = userData.status === 0;
      } else {
        // ถ้าไม่มีข้อมูล status ใน response ก็กำหนดให้เป็น user (isAdmin = false)
        userData.isAdmin = false;
      }
  
      setCurrentUser(userData);
    } catch (error) {
      return (error);
    }
  };

  const logout = async (inputs) => {
    await axios.post("/auth/logout");
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
