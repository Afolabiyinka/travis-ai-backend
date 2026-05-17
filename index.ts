import { configDotenv } from "dotenv";
import { connectDb } from "./config/db";
import { AuthRouter } from "./routes/auth";
import cors from "cors";
import express from "express";
import { UserRouter } from "./routes/user";

configDotenv();

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://travis-ai.vercel.app", "http://localhost:5173"],

    credentials: true,
  })
);


//Routing stuff
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

app.get("/", (req, res) => {
  res.send(
    `<h1> View the api docs <a href="https://79bkunfbq2.apidog.io/">Here</a></h1>`
  );
});

//Connecting to the db
connectDb();
