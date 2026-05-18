import "dotenv/config";
import cors from "cors";
import express from "express";
import { limiter } from "./shared/middleware/rateLimiters";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { errorHandler } from "./shared/middleware/error.Middleware";
import { AuthRouter } from "./modules/auth/auth.routes";
import { AccountRouter } from "./modules/account/account.routes";
import prisma from "./shared/libs/prisma";


const PORT = process.env.PORT;
const app = express();

app.use(helmet());

//Rate Limiting
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler)


//CORS setup
app.use(
  cors({
    origin: ["https://travis-ai.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);



app.get("/", (req, res) => {
  res.send(
    `<h1> View the api docs <a href="https://79bkunfbq2.apidog.io/">Here</a></h1>`
  );
});


async function start() {

  app.use("/api/auth", AuthRouter);
  app.use("/api/me", AccountRouter);
  app.use(errorHandler)


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`);
  });


  //Checking the database connection
  app.listen(PORT, async () => {
    try {
      await prisma.$connect();
      console.log("Prisma DB connected connected");
    } catch (error) {
      console.log("❌ Prisma failed");
      console.error(error);
    }
  });
}



start()