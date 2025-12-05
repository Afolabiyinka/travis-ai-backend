import { configDotenv } from "dotenv";
import { connectDb } from "./config/db";
import { AuthRouter } from "./routes/auth";
import cors from "cors"
configDotenv();

const express = require("express");

const port = process.env.PORT || "";
const app = express();
app.use(express.json());
app.use(cors())

//Doing the routing stuff
app.use("/api/auth", AuthRouter);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

connectDb();
