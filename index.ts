import { configDotenv } from "dotenv";
import { connectDb } from "./config/db";
import { AuthRouter } from "./routes/auth";
configDotenv();

const express = require("express");

const port = process.env.PORT || "";
const app = express();
app.use(express.json());

//Doing the routing stuff
app.use("/api/auth", AuthRouter);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

connectDb();
