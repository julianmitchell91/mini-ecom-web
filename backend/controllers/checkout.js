const products = require('../data/products');
const verifyPayment = require('../payment/hmac');

let nextOrderId = 1;
const orders = [];

module.exports = function checkout(req, res) {

  const { productId, qty, payment_token } = req.body;

  if (!productId || !qty || !paymentToken) {
    return res.status(400).json({ error: 'missing fields' });
  }

  const product = products.find(p => p.id === productId);

  if (!product) return res.status(404).json({ error: 'product not found' });

  // verify payment token (mock)
  const ok = verifyPayment(paymentToken, JSON.stringify({ productId, qty }));
  if (!ok) return res.status(402).json({ error: 'payment failed' });

  if (product.inventory < qty) {
    return res.status(409).json({ error: 'out of stock' });
  }

  // decrement inventory and create order
  product.inventory -= qty;
  const order = { id: nextOrderId++, productId, qty, status: 'created' };
  orders.push(order);

  return res.status(201).json({ order });
};