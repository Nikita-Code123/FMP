import express from "express";
import bodyParser from "body-parser";
import userrouter from "./routes/user.routes.js";
import employeerouter from "./routes/employeer.routes.js";
import paymentrouter from "./routes/payment.routes.js"
import { defineAssociations,syncModels } from "./model/association.js"; 
import ratinguserRouter from "./routes/userrating.routes.js";
import ratingemployeeRouter from "./routes/employeerating.route.js"
import forgetrouter from "./routes/forgetpassword.routes.js"
import cors from 'cors'
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/FreelancerMarketplace/Freelancer", userrouter);
app.use("/FreelancerMarketplace/Employee", employeerouter);
app.use("/FreelancerMarketplace/Payment", paymentrouter); 
app.use("/FreelancerMarketplace/RatingsUser", ratinguserRouter); 
app.use("/FreelancerMarketplace/RatingsEmployee", ratingemployeeRouter); 
app.use('/FreelancerMarketplace/ForgotPassword', forgetrouter);
app.use(express.json());

// Set up associations and sync models

defineAssociations();
syncModels();


app.listen(8000, () => {
    console.log("Server Started..........");
});
