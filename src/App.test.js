import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { App, fetchSelgrosOrderExample } from './App';

jest.mock('axios');

describe('fetchSelgrosOrderExample', () => {
  it('fetches data data from API', async () => {
    const data = {
      purchasersCode:4,
      deliveryAddress:
        {countryCode:"PL",
        city:"Warszawa",
        postalCode:"00-661",
        street:"Plac Politechniki",
        buildingNumber:"1",
        flatNumber:null},
      contactPhone:48500500500,
      createdAt:[2022,4,28,23,36,34,125987000],
      items:[
        {ean:"1",quantity:5},
        {ean:"2",quantity:5},
        {ean:"3",quantity:5},
        {ean:"4",quantity:5}],
      remarks:null
    }

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(fetchSelgrosOrderExample()).resolves.toEqual(data);

    expect(axios.get).toHaveBeenCalledWith(
      process.env.REACT_APP_BACKEND_PROD_URL + '/api/test/SelgrosOrderExample',
    );
    });
});