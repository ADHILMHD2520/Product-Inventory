import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
// import './App.css'
import { Routes, Route } from 'react-router-dom';

import ProductList from './pages/ProductList'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/new" element={<AddProduct />} />
        <Route path="/product/:id/edit" element={<EditProduct />} />


      </Routes>
    </>
  )
}

export default App
