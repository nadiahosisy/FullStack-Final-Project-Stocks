import express from "express";
import nodemon from "nodemon";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import openai from "./routers/openai.js";
import yahoo from "./routers/yahoo.js";
import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config({ path: "./config/config.env" });

import auth from "./routers/auth.js";
import users from "./routers/users.js";
import userHistoryUpdate from "./routers/userHistoryUpdate.js";

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({ name: "Nadia" });
});

// Routers
app.use("/api/v1/openai", openai);
app.use("/api/v1/yahoo", yahoo);
app.use("/api/v1/updateHistory", userHistoryUpdate);

app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});
