import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect } from "react";

import SelgrosOrderForm from './forms/SelgrosOrderForm';
import SelgrosList from './lists/SelgrosList';

const App = () => {

const test = async() => {
  let testUrl = process.env.REACT_APP_PRODUCER_BACKEND_URL + '/api/test'
  const result = await axios.get(testUrl)
  console.log(result)
}


useEffect(() => {
  test();
}, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/order/selgros" element={<SelgrosOrderForm />} />
        <Route path="/api/order/selgros/items" element={<SelgrosList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
