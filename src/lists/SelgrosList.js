import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import 'dayjs/locale/en'

const SelgrosList = () => {
  const [items, setItems] = useState([]);
  let counter = 0;

  const fetchItems = async () => {
    let result;
    result = await axios.get(process.env.REACT_APP_BACKEND_CONS_URL + '/api/order/selgros/items', 
                          { params: {dateFrom: dayjs(0).format('YYYY-MM-DDTHH:mm:ss').toString(), 
                            dateTo: dayjs().format('YYYY-MM-DDTHH:mm:ss').toString()}});

    setItems(result.data.items)
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div
      className="container d-flex justify-content-center"
      style={{ "maxWidth": 1000 }}>
      <table className="table">
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
    </div>
  );
};

export default SelgrosList;
