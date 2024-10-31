const express = require("express");
const morgan =require("morgan");
const httpErrors = require("http-errors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/database")
const accountController = require("./controllers/accountController");
const cartController = require("./controllers/cartController");
const feedBackController = require("./controllers/feedBackController");
const productController = require("./controllers/productController");
const orderDetailController = require("./controllers/orderDetailController");
require("dotenv").config();


// Khoi tao ung dung Express web server
dotenv.config();
const app = express();

// Them cac middlewares kiem soat cac requests, responses
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Ket noi toi co so du lieu MongoDB
connectDB();

// Dinh tuyen tai cap do root (root router)
app.get("/", async (req, res, next) => {
    res.status(200).json({message: "Welcome to RESTFul API - NodeJS web server"});
});

// tiep nhan request
app.use("/auth", accountController);
app.use("/cart", cartController);
app.use("/feedback", feedBackController);
app.use("/manage", productController);
app.use("/orderdetail", orderDetailController);


// Them middleware kiem soat requests loi cho web server
app.use(async(req, res, next) => {
    next(httpErrors.BadRequest());
});

app.use(async(err, req, res, next) => {
    res.status = err.status || 500;
    res.send({message: {status: err.status, message: err.message}});
});

// Thiet lap hoat dong tiep nhan requests va hoi dap responses
const port = process.env.PORT_NUMBER || 8080;
const hostname = process.env.HOST_NAME || "localhost";
app.listen(port, hostname, () => {
    console.log(`Server running at: http://${hostname}:${port}`); 
});

