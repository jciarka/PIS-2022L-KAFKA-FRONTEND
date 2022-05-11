import axios from 'axios';

const fetchItems = async () => {
    let result;
    result = await axios.get(process.env.REACT_APP_BACKEND_CONS_URL + '/api/order/selgros/items');
    return result.data.items;
  };

test('Get items success', async () => {
    let result = await fetchItems();
    const data = {
        ean: "5012345678900",
        quantity: 3,
        recievedAt: "2022-05-11T18:58:44.586",
        purchasersCode: 103
    }
    expect(result[0].ean).toBe("5012345678900");
});

test('Get items defined', async () => {
    let result = await fetchItems();
    expect(result).toBeDefined();
});