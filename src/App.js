import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { useEffect } from "react";

import SelgrosOrderForm from './forms/SelgrosOrderForm';
import SelgrosList from './lists/SelgrosList';
import Header from './components/Header'
import SuppliersList from './components/Orders/SuppliersList'

const App = () => {

const test = async() => {
  let testUrl = process.env.REACT_APP_BACKEND_PROD_URL + '/api/test/SelgrosOrderExample'
  const result = await axios.get(testUrl)
  console.log(result)
}


useEffect(() => {
  test();
}, []);
  return (
    <BrowserRouter>
      <h1>To jest test</h1>
      <Header />
      <Routes>
        <Route path="/customerApp/selgros" element={<SelgrosOrderForm />} />
        <Route path="/aggregatorApp/selgros" element={<SelgrosList />} />
        <Route path="/customerapp" element={<SuppliersList type={"customerApp"} />} />
        <Route path="/aggregatorapp" element={<SuppliersList type={"aggregatorApp"}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
