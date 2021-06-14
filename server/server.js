import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
//have to add .js with our files with ES6 modules and type:'modules' in package.json
import productRoutes from "./routes/productRoutes.js";
import { errorHandle, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API");
});

app.use("/api/products", productRoutes); //to link product related routes from other file

app.use(notFound);

//error middleware which will be run before each request to return JSON error object, good ex would be - authenticate before each request
app.use(errorHandle);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
