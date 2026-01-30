import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/reset.css';
import './styles/common.css';
import './styles/layout.css';
import './styles/main.css';

import Header from './layout/Header';
import Footer from './layout/Footer';

import Main from './components/Main';
import Intro from './components/Intro';
import Info from './components/Info';
import Login from './components/Login';
import Join from './components/Join';
import Order from './components/Order';
import Cart from './components/Cart';
import Customer from './components/Customer';
import Event from './components/Event';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/intro" element={<Intro />} />
        <Route path="/info" element={<Info />} />
        <Route path="/login" element={<Login />} />
        <Route path="/event" element={<Event />} />
        <Route path="/join" element={<Join />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/order" element={<Order />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
