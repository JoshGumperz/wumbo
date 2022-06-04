const express = require("express")
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3000
const routes = require('./routes');

dotenv.config()

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful"))
    .catch((err) => {
        console.log(err)
    })
 
app.use(routes);

app.listen(PORT, () => {
    console.log(`Backend server now running on port http://localhost:${PORT}`)
})