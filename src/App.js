import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavbarComponent from './components/NavbarComponent';
import Products from './pages/Products';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from './store/auth/selectors';
import ProductDetails from './pages/ProductDetails';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <div className="App">
      {isAuthenticated && <NavbarComponent />}

      <div className="main-content">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/product-details/:id" element={<ProductDetails />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
