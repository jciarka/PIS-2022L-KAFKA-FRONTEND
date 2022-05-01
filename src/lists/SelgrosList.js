import React, { useState, useEffect } from "react";
import axios from "axios";

const SelgrosList = () => {
  const [items, setItems] = useState([]);

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
      {items.map((item) => {
        return (
          <div className="container justify-content-center">
            Ean: {item.ean} Quantity: {item.quantity}
          </div>
        );
      })}

    </>
  );
};

export default SelgrosList;
