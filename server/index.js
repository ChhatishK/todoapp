const express = require('express');
require('dotenv').config();
const User = require('./routes/User');
const Todo = require('./routes/Todo');
const db = require('./config/database');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 4000

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

// db connection
db.connect();

// route mounting
app.use('/api/user', User);
app.use('/api/todo', Todo);

app.get('/', (req, res) => {
    return res.send(`<h1>Welcome from Server.</h1>`)
})

app.listen(PORT, () => {
    console.log("Server is runnig on the PORT: ", PORT);
})
