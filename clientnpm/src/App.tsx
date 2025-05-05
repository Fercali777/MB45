import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Dashboard from './pages/Dashboard';
import { AuthContextProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Furnitures from "./pages/Furnitures";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
// import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout general */}
          <Route path="/" element={<AppRoutes />}>
            {/* Dentro del layout */}
            <Route index element={<Home />} />
            <Route path="furnitures" element={<Furnitures />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route 
              path="dashboard-seller"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}


export default App;




