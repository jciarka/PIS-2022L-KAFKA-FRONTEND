import React, { useState, useEffect } from "react";
import axios from "axios";

const SelgrosList = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    let result;
    let currDate = new Date();
    result = await axios.get(process.env.REACT_APP_BACKEND_CONS_URL + '/api/order/selgros/items', { params: {dateFrom: 0, dateTo: Math.floor(currDate.getTime() / 1000)}});

    if (result && result.data && result.data.success) {
      console.log(result);
      setItems(
        result.data.model.map((x) => {
          return { ...x, expanded: false, detailsFetched: false };
        })
      );
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <div className="container justify-content-center">

        {items.map((chatData, index) => {
          return (
            <div key={index} className="row justify-content-center">
                {chatData}        
            </div>
          );
        })}

      </div>
    </>
  );
};

export default SelgrosList;
