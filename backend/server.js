import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookiparser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import connectDb from "./src/Config/db.js";
import authroutes from "./src/routes/authroutes.js";
import linkroutes from "./src/routes/linkroutes.js";
import limiter from "./src/middlewares/limiter.js";

const app = express();
app.use(cookiparser());
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    credentials: true,
  }),
);
app.use(limiter);
connectDb();
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/auth", authroutes);
app.use("/", linkroutes);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
