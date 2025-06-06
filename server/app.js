require("dotenv").config();
const express = require("express");
const app = express();
const CORS = require("cors");
var cookieParser = require("cookie-parser");
const { DB_Connect } = require("./Config/DBConnect");

const AuthRoute = require("./Routes/Auth.js");
const IdeaRoute = require("./Routes/Idea.js")

//essential middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  CORS({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));

//connect to database
DB_Connect(process.env.DB_URL)
  .then((res) => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => {
    console.log("Unable to COnnect to DB due to following error\n" + err);
  });

//routes
app.use("/auth", AuthRoute);
app.use("/idea",IdeaRoute);

//error handler
app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: err.message,
  });
});

app.listen(8080, () => {
  console.log("Server is running at the port 8080");
});
