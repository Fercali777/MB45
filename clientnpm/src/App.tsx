import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import DashboardSeller from './pages/DashboardSeller';
import { AuthContextProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
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
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="profile" element={<DashboardSeller />} />
            <Route 
              path="dashboard-seller"
              element={
                <ProtectedRoute>
                  <DashboardSeller />
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




