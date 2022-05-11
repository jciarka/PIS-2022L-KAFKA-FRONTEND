import React, { useState } from "react";
import axios from "axios";
import dayjs from 'dayjs';
import 'dayjs/locale/en'
import './Form.css'
import { ReactComponent as CancelIcon } from '../icons/cancel.svg'

export const editorTypes = {
    EDIT: "EDIT",
    NEW: "NEW",
};

const SelgrosOrderForm = ({ 
    order = null,
    onSuccess = null,
    type = editorTypes.NEW,
    header
}) => {
    const [purchasersCode, setPurchasersCode] = useState(order ? order.purchasersCode : "");
    const validateCode = () => {
      if (purchasersCode === "" || isNaN(Number(purchasersCode)))
        return "Purchaser's code cannot be void";
      else return 0;
    };
  
    const [countryCode, setCountryCode] = useState(order ? order.countryCode : "");
    const validateCountryCode = () => {
      if (countryCode === "")
        return "Delivery address cannot be void";
      else return 0;
    };

    const [city, setCity] = useState(order ? order.city : "");
    const validateCity = () => {
      if (city === "")
        return "Delivery address cannot be void";
      else return 0;
    };

    const [postalCode, setPostalCode] = useState(order ? order.postalCode : "");
    const validatePostalCode = () => {
      if (postalCode === "")
        return "Delivery address cannot be void";
      else return 0;
    };

    const [street, setStreet] = useState(order ? order.street : "");
    const validateStreet = () => {
      if (street === "")
        return "Delivery address cannot be void";
      else return 0;
    };
    
    const [buildingNumber, setBuildingNumber] = useState(order ? order.buildingNumber : "");
    const validateBuildingNumber = () => {
      if (buildingNumber === "")
        return "Delivery address cannot be void";
      else return 0;
    };

    const [flatNumber, setFlatNumber] = useState(order ? order.flatNumber : "");
    const validateFlatNumber = () => {
      return 0;
    };

    const [contactPhone, setContactPhone] = useState(order ? order.contactPhone : "");
    const validateContactPhone = () => {
      if (contactPhone === "" || isNaN(Number(contactPhone)))
        return "Contact phone cannot be void";
      else return 0;
    };

    const [items, setItems] = useState(order ? order.items : []);
    const validateItems = () => {
      if (items.length === 0)
        return "Items cannot be void";
      else return 0;
    };

    const [remarks, setRemarks] = useState(order ? order.remarks : "");
    const validateRemarks = () => {
      if (remarks === "")
        return "Remarks cannot be void";
      else return 0;
    };

    const [ean, setEan] = useState("");
    const validateEan = () => {
      if (ean === "")
        return "Ean cannot be void";
      else return 0;
    };

    const [quantity, setQuantity] = useState("");
    const validateQuantity = () => {
      if (quantity === "" || isNaN(Number(quantity)))
        return "Quantity cannot be void";
      else return 0;
    };

    const [itemsNum, setItemsNum] = useState(0);

    const validateAll = () => {
      if (validateCode() !== 0) return false;
      if (validateContactPhone() !== 0) return false;
      if (validateItems() !== 0) return false;
      if (validateBuildingNumber() !== 0) return false;
      if (validateCity() !== 0) return false;
      if (validateCountryCode() !== 0) return false;
      if (validateEan() !== 0) return false;
      if (validateFlatNumber() !== 0) return false;
      if (validatePostalCode() !== 0) return false;
      if (validateQuantity() !== 0) return false;
      return true;
    };

    const validateItem = () => {
      if (validateEan() !== 0) return false;
      if (validateQuantity() !== 0) return false;
      return true;
    };
      
    const submit = async () => {
        try {
          const result = await axios.post(process.env.REACT_APP_BACKEND_PROD_URL + "/api/order/selgros", {
            ...order,
            purchasersCode: Number(purchasersCode),
            deliveryAddress: {
                countryCode,
                city,
                postalCode,
                street,
                buildingNumber,
                flatNumber
            },
            contactPhone: Number(contactPhone),
            createdAt: dayjs().format('YYYY-MM-DDTHH:mm:ss').toString(),
            items,
            remarks
          });
    
          if (result) 
          {
            setBuildingNumber("");
            setCity("");
            setContactPhone("");
            setCountryCode("");
            setEan("");
            setFlatNumber("");
            setItems([]);
            setPostalCode("");
            setPurchasersCode("");
            setQuantity("");
            setRemarks("");
            setStreet("");
          }    
      } catch (e) {
        console.log(e);
        alert("Order not send");
      }
    };

    const addItem = async() => {
      items.push({quantity: Number(quantity), ean: ean});
      setItemsNum(itemsNum + 1)
    };

    const removeItem = async() => {
      items.pop({quantity: Number(quantity), ean: ean});
      setItemsNum(itemsNum - 1)
    };
  
    return (
      <div
        className="container d-flex justify-content-center"
        style={{ "maxWidth": 800 }}
      >
        <div
          className="card m-4 p-4 rounded rounded-lg w-100 shadow border rounded-0"
          style={{ border: "#8f8f8fb6" }}
        >
          <div className="m-2 w-100 text-center">
            <h3>New Selgros order</h3>
          </div>

          <div className="form-row mt-1">          
            <div className="col">
              <label htmlFor="name">Puchaser's code</label>
              <input
                type="text"
                className="form-control"
                placeholder="102"
                value={purchasersCode}
                onChange={(e) => {
                  setPurchasersCode(e.target.value);
                  validateCode();
                }}
              />
            </div>
          </div>

          <div className="mt-4 mb-1 w-100 text-center" id="section-header">
            <h6>Delivery address</h6>
          </div>

          <div className="form-row mb-2">
            <div className="col-3">
              <label htmlFor="name">Country code</label>
              <input
                type="text"
                className="form-control"
                placeholder="PL"
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  validateCountryCode();
                }}
              />
            </div>
            <div className="col-6">
              <label htmlFor="name">City</label>
              <input
                type="text"
                className="form-control"
                placeholder="Warsaw"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  validateCity();
                }}
              />
            </div>
            <div className="col-3">
              <label htmlFor="name">Postal code</label>
              <input
                type="text"
                className="form-control"
                placeholder="01-001"
                value={postalCode}
                onChange={(e) => {
                  setPostalCode(e.target.value);
                  validatePostalCode();
                }}
              />
            </div>
          </div>

          <div className="form-row mb-2">
            <div className="col-6">
              <label htmlFor="name">Street</label>
              <input
                type="text"
                className="form-control"
                placeholder="Plac Politechniki"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                  validateStreet();
                }}
              />
            </div>
            <div className="col-3">
              <label htmlFor="name">Building number</label>
              <input
                type="text"
                className="form-control"
                placeholder="1"
                value={buildingNumber}
                onChange={(e) => {
                  setBuildingNumber(e.target.value);
                  validateBuildingNumber();
                }}
              />
            </div>
            <div className="col-3">
              <label htmlFor="name">Flat number</label>
              <input
                type="text"
                className="form-control"
                placeholder="320"
                value={flatNumber}
                onChange={(e) => {
                  setFlatNumber(e.target.value);
                  validateFlatNumber();
                }}
              />
            </div>
          </div>

          <div className="form-row mt-4">
            <div className="col">
              <label htmlFor="name">Phone number</label>
              <input
                type="text"
                className="form-control"
                placeholder="48500600500"
                value={contactPhone}
                onChange={(e) => {
                  setContactPhone(e.target.value);
                  validateContactPhone();
                }}
              />
            </div>
          </div>

          <div className="mt-4 mb-2 w-100 text-center">
            <h6>Items</h6>
          </div>

          <div className="form-row">
            <div className="col-5">
              <label htmlFor="name">Ean</label>
              <input
                type="text"
                className="form-control"
                placeholder="5012345678900"
                value={ean}
                onChange={(e) => {
                  setEan(e.target.value);
                  validateEan();
                }}
              />
            </div>
            <div className="col-5">
              <label htmlFor="name">Quantity</label>
              <input
                type="text"
                className="form-control"
                placeholder="1"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  validateQuantity();
                }}
              />
            </div>

            <div className="item-button">
              <button
                disabled={!validateItem()}
                type="submit"
                className="btn btn-primary rounded-0"
                onClick={(e) => addItem()}
              >
                Add item
              </button>
            </div>
          </div>

          {items.map((item) => {
            return (
              <div className="row mt-2">
                <div className="col-5">
                  Ean: {item.ean}             
                </div>
                <div className="col-5">
                  Quantity: {item.quantity} 
                </div>
                <CancelIcon width="1.5rem" onClick={(e) => removeItem()}/>
              </div>

            );
          })}

          <div className="form-row mt-4">
            <div className="col">
              <label htmlFor="name">Remarks</label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value={remarks}
                onChange={(e) => {
                  setRemarks(e.target.value);
                  validateRemarks();
                }}
              />
            </div>
          </div>
  
          <div className="mt-2 w-100 text-center">
            <button
              disabled={!validateAll()}
              type="submit"
              className="btn btn-primary rounded-0"
              onClick={(e) => submit()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };
  

export default SelgrosOrderForm;