import { createContext, useState, useEffect, useContext, ReactNode } from "react";

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

type AuthContextType = {
  user: AppUser | null;
  token: string | null;
  loadingUser: boolean;
  userReady: boolean; // ✅ nuevo
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedData: Partial<AppUser>) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContextInitValue: AuthContextType = {
  user: null,
  token: null,
  loadingUser: true,
  userReady: false, // ✅ nuevo
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUser: () => {},
};

export const AuthContext = createContext<AuthContextType>(AuthContextInitValue);

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [loadingUser, setLoadingUser] = useState(true);
  const [userReady, setUserReady] = useState(false); // ✅ nuevo

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Respuesta de login:", data);

      if (res.ok) {
        const userData = data.user || data;
        setUser(userData);
        setUserReady(true); // ✅ nuevo
        localStorage.setItem("token", data.token);
        setToken(data.token);
        console.log("Usuario logueado:", userData);
      } else {
        throw new Error(data.message || "Error en login");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

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
        setUserReady(true); // ✅ nuevo
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        throw new Error(data.message || "Error en registro");
      }
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setUserReady(false); // ✅ nuevo
    localStorage.removeItem("token");
  };

  const updateUser = (updatedData: Partial<AppUser>) => {
    setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
  };

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        console.log("No hay token en localStorage");
        setLoadingUser(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          console.log("Usuario recuperado:", data.user);
          setUser(data.user);
          setToken(storedToken);
          setUserReady(true); // ✅ nuevo
        } else {
          console.warn("Token inválido o expirado");
          logout();
        }
      } catch (err) {
        console.error("Error verificando sesión:", err);
        logout();
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loadingUser,
        userReady, // ✅ nuevo
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};








// import { createContext, useState, useEffect, useContext, ReactNode } from "react";

// // 👤 Tipo de usuario personalizado 
// export type AppUser = {
//   _id: string;
//   name: string;
//   email: string;
//   role: "buyer" | "seller";
//   phone: string;
//   address: string;
//   city: string;
//   country: string;
//   postCode: string;
// };

// type AuthContextType = {
//   user: AppUser | null;
//   token: string | null;
//   loadingUser: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string, role: string) => Promise<void>;
//   logout: () => void;
//   updateUser: (updatedData: Partial<AppUser>) => void;
// };

// type AuthProviderProps = {
//   children: ReactNode;
// };

// const AuthContextInitValue: AuthContextType = {
//   user: null,
//   token: null,
//   loadingUser: true,
//   login: async () => {},
//   register: async () => {},
//   logout: () => {},
//   updateUser: () => {},
// };

// export const AuthContext = createContext<AuthContextType>(AuthContextInitValue);

// export const AuthContextProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<AppUser | null>(null);
//   const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
//   const [loadingUser, setLoadingUser] = useState(true);

//   const login = async (email: string, password: string) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       console.log("Respuesta de login:", data);

//       if (res.ok) {
//         const userData = data.user || data;
//         setUser(userData);
//         localStorage.setItem("token", data.token);
//         setToken(data.token);
//         console.log("Usuario logueado:", userData);
//       } else {
//         throw new Error(data.message || "Error en login");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };

//   const register = async (name: string, email: string, password: string, role: string) => {
//     try {
//       const res = await fetch("http://localhost:5000/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, email, password, role }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setUser(data.user);
//         localStorage.setItem("token", data.token);
//         setToken(data.token);
//       } else {
//         throw new Error(data.message || "Error en registro");
//       }
//     } catch (err) {
//       console.error("Register error:", err);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("token");
//   };

//   const updateUser = (updatedData: Partial<AppUser>) => {
//     setUser((prev) => (prev ? { ...prev, ...updatedData } : null));
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       const storedToken = localStorage.getItem("token");
//       if (!storedToken) {
//         console.log("No hay token en localStorage");
//         setLoadingUser(false);
//         return;
//       }

//       try {
//         const res = await fetch("http://localhost:5000/api/auth/me", {
//           headers: {
//             Authorization: `Bearer ${storedToken}`,
//           },
//         });

//         const data = await res.json();

//         if (res.ok) {
//           console.log("Usuario recuperado:", data.user);
//           setUser(data.user);
//           setToken(storedToken);
//         } else {
//           console.warn("Token inválido o expirado");
//           logout();
//         }
//       } catch (err) {
//         console.error("Error verificando sesión:", err);
//         logout();
//       } finally {
//         setLoadingUser(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         loadingUser,
//         login,
//         register,
//         logout,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };
