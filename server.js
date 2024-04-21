import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT || 8800;

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

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
