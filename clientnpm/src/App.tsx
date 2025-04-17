import { Routes, Route } from 'react-router'; 
import './App.css';
import RegisterForm from './components/RegisterForm';
import ProfileInfo from './components/ProfileInfo';
import Login from './components/Login';
import DashboardSeller from './pages/DashboardSeller';
import { AuthContextProvider } from "./context/AuthContext";



function App() {
  return (
<div className='container'>
<Routes>
  <Route path="/" element={
    <>
      <RegisterForm />
      <Login />
      <ProfileInfo />
    </>
  } />
  <Route path="/dashboard-seller" element={<DashboardSeller />} />
</Routes>
</div>







  );
}

export default App;







{/* <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppRoutes />}>
            <Route path="/" element={<Home />} />
            <Route path="/vinyl-hunt" element={<VinylHunt />} />
            <Route path="/vinyl/:id" element={<VinylDetail />} />
            <Route
              path="/my-spins"
              element={
                <ProtectedRoute>
                  <MySpins />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider> */}