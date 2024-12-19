import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./src/config/dbConnect.js";
import authRoutes from "./src/routes/authRoutes.js";

dbConnect();

const app = express();

//Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use(authRoutes);

const PORT = process.env.PORT || 7002;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})