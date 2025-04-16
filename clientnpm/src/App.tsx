import { Routes, Route } from 'react-router'; 
import './App.css';
import RegisterForm from './components/RegisterForm';
import ProfileInfo from './components/ProfileInfo';
import Login from './components/Login';
import DashboardSeller from './pages/DashboardSeller';

function App() {
  return (
    <div>
      <h1>Formulario</h1>


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