import express from "express";
import nodemon from "nodemon";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import stocks from "./routers/stocks.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({ name: "Nadia" });
});

// Routers
app.use("/api/v1/stocks", stocks);

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
