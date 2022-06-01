import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect } from "react";

import SelgrosOrderForm from './forms/SelgrosOrderForm';
import SelgrosList from './lists/SelgrosList';
import Header from './components/Header'
import SuppliersList from './components/Orders/SuppliersList'

import './App.css'
import DhlOrderForm from './forms/DhlOrderForm';
import DhlList from './lists/DhlList';

export const fetchSelgrosOrderExample = async query => {
  const url = process.env.REACT_APP_BACKEND_PROD_URL + '/api/test/SelgrosOrderExample';

  return await axios.get(url);
};

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
      <Header />
      <Routes>
        <Route path="/customerApp/selgros" element={<SelgrosOrderForm />} />
        <Route path="/aggregatorApp/selgros" element={<SelgrosList />} />
        <Route path="/customerApp/dhl" element={<DhlOrderForm/>} />
        <Route path="/aggregatorApp/dhl" element={<DhlList />} />
        <Route path="/customerapp" element={<SuppliersList type={"customerApp"} />} />
        <Route path="/aggregatorapp" element={<SuppliersList type={"aggregatorApp"}/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
