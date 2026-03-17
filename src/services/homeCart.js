const url = 'http://localhost:1111/api/cart';

const fetchConfig = (method, body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', 
    };
    if (body) options.body = JSON.stringify(body);
    return options;
};

export const homeCart = {
    addProduct: async (productId, quantity = 1) => {
        const res = await fetch(url, fetchConfig('POST', { product: productId, quantity }));
        return await res.json();
    },
};