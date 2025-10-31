const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const landRoutes = require("./routes/landRoutes")
const sellerRoutes = require("./routes/sellerRoutes")
const cors=require("cors");


dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/land", landRoutes);
app.use("/api/sellerAuth", sellerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
