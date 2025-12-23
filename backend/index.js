const express = require('express');
const { router } = require('./Routes/route');
const { database } = require('./config/database');
require('dotenv').config();
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8001;



// ✅ IMPORTANT — must be before routes
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
database();
app.use('/api', router);

app.listen(port, () => {
  console.log(`✅ Server started on port ${port}`);
});