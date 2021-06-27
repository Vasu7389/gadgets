import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./config/db.js";
//have to add .js with our files with ES6 modules and type:'modules' in package.json
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandle, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); //this will allow us to accepts json data from url body

app.use("/api/products", productRoutes); //to link product related routes from other file
app.use("/api/user", userRoutes); //to link user related routes from other file
app.use("/api/orders", orderRoutes); //to link order related routes from other file

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);

//error middleware which will be run before each request to return JSON error object, good ex would be - authenticate before each request
app.use(errorHandle);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
