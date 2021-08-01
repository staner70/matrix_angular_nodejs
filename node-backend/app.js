require('dotenv').config();
const path = require('path');
const express = require('express');
const router = require('./app/routers');
const clientMongoose = require('./app/database/client');
const cors = require('cors');
// const { urlencoded } = require('express');

const app = express();

// Express - Body Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'app/public')));
app.use(cors());
app.use(router);


// Connection Mongoose
clientMongoose();

app.listen(process.env.PORT || 3000, () => {
   console.log('Server running on :', process.env.PORT);
});