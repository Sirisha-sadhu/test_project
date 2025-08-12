const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectToMongoDB = require('./config/mongodbConfig');
const userRoutes = require('./Routes/Users.js');




const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing
app.use(cors());

app.get('/', (req, res)=>{
    res.json('Welcome to test project')
});

app.use('/api/users', userRoutes );

const port = process.env.PORT || PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectToMongoDB();
});