import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router'; // ← asegúrate que sea 'react-router-dom'
import './index.css';
import App from './App.tsx';
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthContextProvider } from './context/AuthContext';

createRoot(document.getElementById('root')!).render(


  
<StrictMode>
<BrowserRouter>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
</BrowserRouter>
</StrictMode>


);




// <StrictMode>
// <App />
// </StrictMode>