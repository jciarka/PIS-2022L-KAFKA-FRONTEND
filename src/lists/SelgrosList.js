import React, { useState, useEffect } from "react";
import axios from "axios";

const SelgrosList = () => {
  const [items, setItems] = useState([]);
  let counter = 0;

  const fetchItems = async () => {
    let result;
    let currDate = new Date();
    result = await axios.get(process.env.REACT_APP_BACKEND_CONS_URL + '/api/order/selgros/items', { params: {dateFrom: 0, dateTo: currDate.getTime()}});
    console.log(result.data.items);
    setItems(result.data.items)
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Ean</th>
            <th scope="col">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            counter = counter + 1;
            return (
              <tr>
                <th scope="row">{counter}</th>
                <td>{item.ean}</td>
                <td>{item.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SelgrosList;
