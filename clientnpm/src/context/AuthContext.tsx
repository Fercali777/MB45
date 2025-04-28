import { createContext, useState, useEffect, ReactNode } from "react";

// 👤 Tipo de usuario personalizado 
export type AppUser = {
  _id: string;
  name: string;
  email: string;
  role: "buyer" | "seller";
  phone: string;
  address: string;
  city: string;
  country: string;
  postCode: string;
};

// Tipo para el contexto
type AuthContextType = {
  user: AppUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
};

// 🧱 Tipo para el proveedor de contexto
type AuthProviderProps = {
  children: ReactNode;
};

// 🚧 Valor inicial del contexto
const AuthContextInitValue: AuthContextType = {
  user: null,
  login: async () => {}, 
  register: async () => {},
  logout: () => {},
};

//  Crear el contexto
export const AuthContext = createContext<AuthContextType>(AuthContextInitValue);

//  Crear el proveedor de contexto
export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);

  //  Login
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
      console.log(" Respuesta de login:", data);
  
      if (res.ok) {
        // Verifica si user viene en data.user o directamente
        const userData = data.user || data;
        setUser(userData);
        localStorage.setItem("token", data.token);
  
        console.log(" Usuario logueado:", userData);
        console.log(" Token guardado:", data.token);
      } else {
        console.error(" Error en login:", data.message || "Respuesta no válida");
        throw new Error(data.message || "Error en login");
      }
    } catch (err) {
      console.error(" Login error:", err);
    }
  };
  //  Registro
  const register = async (name: string, email: string, password: string, role: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        localStorage.setItem("token", data.token);
      } else {
        throw new Error(data.message || "Error en registro");
      }
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // 🔄 Mantener sesión iniciada tras recargar
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No hay token en localStorage");
        return;
      }
  
      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await res.json();
  
        if (res.ok) {
          console.log("Usuario recuperado:", data.user); // Verifica que recibes el usuario
          setUser(data.user); // Actualiza el estado del usuario
        } else {
          console.warn("Token inválido o expirado");
          logout();
        }
      } catch (err) {
        console.error("Error verificando sesión:", err);
        logout();
      }
    };
  
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};