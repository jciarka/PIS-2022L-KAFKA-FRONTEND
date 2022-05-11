import { render, screen } from '@testing-library/react';
import SelgrosOrderForm from './SelgrosOrderForm';
import axios from 'axios';


test('renders header', () => {
  render(<SelgrosOrderForm />);
  const linkElement = screen.getByText(/New Selgros order/i);
  expect(linkElement).toBeInTheDocument();
});

const newSelgrosOrder = async () => {
  let result = await axios.post(process.env.REACT_APP_BACKEND_PROD_URL + "/api/order/selgros", 
  {
    purchasersCode:4,
    deliveryAddress:
      {countryCode:"PL",
      city:"Warszawa",
      postalCode:"00-661",
      street:"Plac Politechniki",
      buildingNumber:"1",
      flatNumber:null},
    contactPhone:48500500500,
    createdAt:[2022,4,28,23,36,34,125987],
    items:[
      {ean:"1",quantity:5},
      {ean:"2",quantity:5},
      {ean:"3",quantity:5},
      {ean:"4",quantity:5}],
    remarks:null
  });

  return result;
}

test('New selgros order', async () => {
  let result = await newSelgrosOrder();
  expect(result.data.message).toBe("A new selgros order has been retrieved!")
});