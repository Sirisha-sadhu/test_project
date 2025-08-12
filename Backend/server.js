const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Basic route
app.get('/', (req, res) => {
    res.send('Express server with CORS enabled');
});



const port = process.env.PORT || PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});