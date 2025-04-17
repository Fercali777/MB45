import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import RegisterForm from './components/RegisterForm';
import ProfileInfo from './components/ProfileInfo';
import Login from './components/Login';
import DashboardSeller from './pages/DashboardSeller';
import { AuthContextProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
// import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (

    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<AppRoutes />}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard-seller" element={<DashboardSeller />} /> */}

            <Route
              path="/dashboard-seller"
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











//     <div className='container'>
// <Routes>
//   <Route path="/" element={
//     <>
//       <RegisterForm />
//       <Login />
//       <ProfileInfo />
//     </>
//   } />
//   <Route path="/dashboard-seller" element={<DashboardSeller />} />
// </Routes>
// </div>