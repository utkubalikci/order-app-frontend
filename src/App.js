import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { PrimeReactProvider } from 'primereact/api';
import Products from './components/Product/Products';

import LinkToLogin from './components/LoginRegister/LinkToLogin';
import Profile from './components/Profile/Profile';
import 'primereact/resources/themes/saga-blue/theme.css';   // Tema dosyası
import 'primereact/resources/primereact.min.css';           // Primereact
import 'primeicons/primeicons.css';                         // PrimeIcons
import 'primeflex/primeflex.css';                           // PrimeFlex
import LoginPage from './components/LoginRegister/LoginPage';
import RegisterPage from './components/LoginRegister/RegisterPage';
import Cart from './components/Cart/Cart';
import Navbar from './components/Navbar/Navbar';
import Orders from './components/Orders/Orders';
import AdminPage from './components/Admin/AdminPage';
import AddProduct from './components/Admin/AddProduct';
import AddCategory from './components/Admin/AddCategory';
import EditCategory from './components/Admin/EditCategory';


function App({ Component, pageProps }) {
  return (
    <div>
      <PrimeReactProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/admin' element={<AdminPage />} />
            <Route path='/admin/add/product' element={<AddProduct />} />
            <Route path='/admin/add/category' element={<AddCategory />} />
            <Route path='/admin/edit/category' element={<EditCategory />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/orders' element={<Orders />} />
            <Route path="/myProfile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/toLogin" element={<LinkToLogin />} />
            <Route path="/product" element={<Products />} />
            <Route path='/*' element={<Navigate to="/toLogin" />} />
          </Routes>
        </BrowserRouter>
      </PrimeReactProvider>
    </div>
  );
}

export default App;
