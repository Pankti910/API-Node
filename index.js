const express = require('express');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json({type:"application/json"}));
app.use(bodyParser.urlencoded({extended:false}));
const dotenv = require('dotenv');
dotenv.config();


const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');


// Use API routes
app.use('/api/user', userRoutes);
app.use('/api/product',productRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
