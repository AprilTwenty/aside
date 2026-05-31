import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import AppError from "./utils/AppError.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "API runing"
    })
})
app.get("/test-error", (req, res) => {
    throw new AppError(`Test Error` , 401);
})
app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})