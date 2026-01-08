require("dotenv").config();
const express = require("express");
const app = express();
const CORS = require("cors");
var cookieParser = require("cookie-parser");
const { DB_Connect } = require("./Config/DBConnect");
const {createServer} = require("node:http");
const server = createServer(app);
const {connectToSocket} = require("./Socket.Controller.js")

const AuthRoute = require("./Routes/Auth.js");
const IdeaRoute = require("./Routes/Idea.js");
const ChatRoute = require("./Routes/Chats.js");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  CORS({
    // origin: "https://ai-think-idea-aggregator.vercel.app",
    origin:"http://localhost:5173",
    credentials: true,
  })
);

//connect to database
DB_Connect(process.env.DB_URL)
  .then((res) => {
    console.log("Connected to DB Successfully");
  })
  .catch((err) => {
    console.log("Unable to COnnect to DB due to following error\n" + err);
  });

//socket Connection for Chats
connectToSocket(server);

//routes
app.use("/auth", AuthRoute);
app.use("/idea",IdeaRoute);
app.use("/chat",ChatRoute);
app.use("/health",(req,res)=>res.status(200).json({success:true,message:"Server is healthy"}));

//error handler
app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    error: err.message,
  });
});

server.listen(8080, () => {
  console.log("Server is running at the port 8080");
});
