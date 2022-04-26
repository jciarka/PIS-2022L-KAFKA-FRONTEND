import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from "react";

import SelgrosOrderForm from './forms/SelgrosOrderForm';

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
    <Router>
      <SelgrosOrderForm />
      <Routes>
        <Route path="/api/order/selgros" exact={true} component={SelgrosOrderForm} />
      </Routes>
    </Router>
  );
};

export default App;
