const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const productRoutes = require("./routes/productRoutes");


const connectDb = require("./config/db");

connectDb()

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/products", productRoutes);



app.listen(process.env.Port, () => console.log(`Server running on port ${process.env.Port}`));
