import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './common/Navbar';
import ProductList from './components/Product/ProductList';
import AddProduct from './components/Product/AddProduct';
import ClientList from './components/Client/ClientList';
import AddClient from './components/Client/AddClient';
import CategoryList from './components/Category/CategoryList';
import AddCategory from './components/Category/AddCategory';
import InvoiceList from './components/Invoice/InvoiceList';
import AddInvoice from './components/Invoice/AddInvoice';
import NotFound from './common/NotFound';
import Home from './common/Home';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/add-product" element={<AddProduct />} />
        <Route path="/product/edit/:id" element={<AddProduct />} />
        <Route path="/clients" element={<ClientList />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/client/edit/:id" element={<AddClient />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/categories/add-category" element={<AddCategory />} />
        <Route path="/category/edit/:id" element={<AddCategory />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/invoices/add-invoice" element={<AddInvoice />} />
        <Route path="/invoice/show/:id" element={<AddInvoice />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
