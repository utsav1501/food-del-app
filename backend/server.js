import express from "express";
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import WebHookRouter from "./routes/webhookROutes.js";
import bodyParser from "body-parser";

//app config
const app=express();
const port=4000;

//middleware
app.use(express.json());//parse the request
app.use(cors());//using this we can get backend from permitted frontend

//db connection
connectDB();

// api endpoint
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
//Stripe requires raw body for webhook verification
app.use('/webhook',bodyParser.raw({type:'application/json'}));
app.use('/webhook',WebHookRouter);



app.get("/",(req,res)=>{
    res.send("API Working")
})

app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`)
})


