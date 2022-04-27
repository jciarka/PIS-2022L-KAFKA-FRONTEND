import React, { useState } from "react";
import axios from "axios";

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
    const [purchasersCode, setPurchasersCode] = useState(order ? order.purchasersCode : null);
    const validateCode = () => {
      if ((purchasersCode && purchasersCode.length === 0) || purchasersCode === null)
        return "Purchaser's code cannot be void";
      else return "";
    };
  
    const [countryCode, setCountryCode] = useState(order ? order.countryCode : null);
    const validateCountryCode = () => {
      if ((countryCode && countryCode.length === 0) || countryCode === null)
        return "Delivery address cannot be void";
      else return "";
    };

    const [city, setCity] = useState(order ? order.city : null);
    const validateCity = () => {
      if ((city && city.length === 0) || city === null)
        return "Delivery address cannot be void";
      else return "";
    };

    const [postalCode, setPostalCode] = useState(order ? order.postalCode : null);
    const validatePostalCode = () => {
      if ((postalCode && postalCode.length === 0) || postalCode === null)
        return "Delivery address cannot be void";
      else return "";
    };

    const [street, setStreet] = useState(order ? order.street : null);
    const validateStreet = () => {
      if ((street && street.length === 0) || street === null)
        return "Delivery address cannot be void";
      else return "";
    };
    
    const [buildingNumber, setBuildingNumber] = useState(order ? order.buildingNumber : null);
    const validateBuildingNumber = () => {
      if ((buildingNumber && buildingNumber.length === 0) || buildingNumber === null)
        return "Delivery address cannot be void";
      else return "";
    };

    const [flatNumber, setFlatNumber] = useState(order ? order.flatNumber : null);
    const validateFlatNumber = () => {
      if ((flatNumber && flatNumber.length === 0) || flatNumber === null)
        return "Delivery address cannot be void";
      else return "";
    };

    const [contactPhone, setContactPhone] = useState(order ? order.contactPhone : null);
    const validateContactPhone = () => {
      if ((contactPhone && contactPhone.length === 0) || contactPhone === null)
        return "Contact phone cannot be void";
      else return "";
    };

    const [items, setItems] = useState(order ? order.items : []);
    const validateItems = () => {
      if ((items && items.length === 0) || items === [])
        return "Items cannot be void";
      else return "";
    };

    const [remarks, setRemarks] = useState(order ? order.remarks : null);
    const validateRemarks = () => {
      if ((remarks && remarks.length === 0) || remarks === null)
        return "Remarks cannot be void";
      else return "";
    };

    const [ean, setEan] = useState(null);
    const validateEan = () => {
      if ((ean && ean.length === 0) || ean === null)
        return "Ean cannot be void";
      else return "";
    };

    const [quantity, setQuantity] = useState(null);
    const validateQuantity = () => {
      if ((quantity && quantity.length === 0) || quantity === null)
        return "Quantity cannot be void";
      else return "";
    };

    const [backendErrors, setBackendErrors] = useState([]);

    const validateAll = () => {
      if (validateCode() !== "") return false;
      if (validateContactPhone() !== "") return false;
      if (validateItems() !== "") return false;
      if (validateRemarks() !== "") return false;
      return true;
    };
    
  
    const submit = async () => {
        let currDate = new Date();
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
          createdAt: [
              currDate.getFullYear(),
              currDate.getMonth() + 1,
              currDate.getDate(),
              currDate.getHours(),
              currDate.getMinutes(),
              currDate.getSeconds(),
              Math.floor(currDate.getTime() / 1000)
          ],
          items,
          remarks
        });
  
        if (
          result &&
          result.data &&
          result.data.success) 
          {
            setBuildingNumber(null);
            setCity(null);
            setContactPhone(null);
            setCountryCode(null);
            setEan(null);
            setFlatNumber(null);
            setItems([]);
            setPostalCode(null);
            setPurchasersCode(null);
            setQuantity(null);
            setRemarks(null);
            setStreet(null);
        } else {
          setBackendErrors(result.data.errors);
          return;
        }
  
        if (onSuccess) {
          onSuccess(result.data.model);
        }
      } catch (e) {
        if (e.response) {
          setBackendErrors([e.message]);
        } else {
          setBackendErrors(e);
        }
      }
    };

    const addItem = async() => {
        items.push({quantity: Number(quantity), ean: ean});
    };
  
    return (
      <div
        className="container d-flex justify-content-center"
        style={{ "max-width": 600 }}
      >
        <div
          className="card m-4 p-4 rounded rounded-lg w-100 shadow border rounded-0"
          style={{ border: "#8f8f8fb6" }}
        >
          {/* {header && (
            <div className=" text-center">
              <h4>{header}</h4>
            </div>
          )} */}
          <h2>New Selgros order</h2>

          <h4>Purchaser's code</h4>
          <div className="form-group m-0">
            <input
              type="text"
              className="form-control"
              placeholder="Purchase code"
              value={purchasersCode}
              onChange={(e) => {
                setPurchasersCode(e.target.value);
                validateCode();
              }}
            />
          </div>

          <h4>Delivery address</h4>

          <div className="form-group m-0">
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
          <div className="form-group m-0">
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
          <div className="form-group m-0">
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
          <div className="form-group m-0">
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
          <div className="form-group m-0">
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
          <div className="form-group m-0">
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

          <h4>Phone number</h4>
          <div className="form-group m-0">
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

          <h4>Items</h4>
          <div className="form-group m-0">
            <label htmlFor="name">Ean</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={ean}
              onChange={(e) => {
                setEan(e.target.value);
                validateEan();
              }}
            />
          </div>
          <div className="form-group m-0">
            <label htmlFor="name">Quantity</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                validateQuantity();
              }}
            />
          </div>

          <div className="mt-2 w-100 text-center">
            <button
              disabled={validateAll()}
              type="submit"
              className="btn btn-primary rounded-0"
              onClick={(e) => addItem()}
            >
              Add item
            </button>
          </div>


          <h4>Remarks</h4>
          <div className="form-group m-0">
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
  
          {backendErrors && backendErrors.length > 0 && (
            <div className="pb-2 alert alert-danger p-0 d-flex align-items-center">
              <div className="text-center w-100" role="alert">
                {backendErrors.map((error, index) => {
                  return (
                    <div key={index}>
                      <label>{error}</label>
                    </div>
                  );
                })}
              </div>
              <div
                className="close small m-1 p-1 align-middle"
                data-dismiss="alert"
                style={{ fontSize: "20px", display: "block" }}
              >
                <span
                  style={{ display: "block" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setBackendErrors([]);
                  }}
                >
                  &times;
                </span>
              </div>
            </div>
          )}
  
          <div className="mt-2 w-100 text-center">
            <button
              disabled={validateAll()}
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