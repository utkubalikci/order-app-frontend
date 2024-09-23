import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import Products from './components/Product/Products';
import ProductCard from './components/Product/ProductCard';

// import "primereact/resources/themes/lara-light-cyan/theme.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import LinkToLogin from './components/LoginRegister/LinkToLogin';
import Profile from './components/Profile/Profile';
import 'primereact/resources/themes/saga-blue/theme.css';   // Tema dosyası
import 'primereact/resources/primereact.min.css';           // Primereact CSS
import 'primeicons/primeicons.css';                         // PrimeIcons
import 'primeflex/primeflex.css';                           // PrimeFlex (Grid ve layout düzenlemeleri için)
import LoginPage from './components/LoginRegister/LoginPage';
import RegisterPage from './components/LoginRegister/RegisterPage';


function App({ Component, pageProps }) {
  return (
    <div>
      <PrimeReactProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path="/myProfile" element={<Profile />} />
            <Route path="/toLogin" element={<LinkToLogin />} />
            <Route path="/product" element={<Products />} />
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
