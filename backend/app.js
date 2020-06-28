const express = require('express');
const bodyParser = require('body-parser');
const checkout = require('./controllers/checkout');

const app = express();
app.use(bodyParser.json());

app.post('/checkout', checkout);

module.exports = app;

// allow running directly for quick manual testing
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log('listening', port));
}