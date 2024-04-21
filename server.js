import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8800;

//middlewares
app.use(express.json());

// mongodb connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDb connection succeeded!");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo" + err);
  });

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
