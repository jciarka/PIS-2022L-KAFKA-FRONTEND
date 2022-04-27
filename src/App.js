import axios from 'axios';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { useEffect } from "react";

import SelgrosOrderForm from './forms/SelgrosOrderForm';
import SelgrosList from './lists/SelgrosList';

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
      <h2>
        Ordering app
      </h2>
      <Link to="/api/order/selgros">Order at Selgros</Link>
      <Link to="/api/order/selgros/items">List of Selgros orders</Link>
      <Routes>
        <Route path="/api/order/selgros" element={<SelgrosOrderForm />} />
        <Route path="/api/order/selgros/items" element={<SelgrosList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
