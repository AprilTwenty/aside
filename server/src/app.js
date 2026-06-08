import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import routerAuth from "./routes/auth.js";
import requireJson from "./middleware/requireJsonValidation.js";
import routerSaves from "./routes/saves.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is required");
}

app.use(cors());

app.use(express.json());
app.use(requireJson);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "API runing"
    })
})

app.use("/auth", routerAuth);
app.use("/saves", routerSaves);

app.use(errorHandler);



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})