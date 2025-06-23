import mongoose, { mongo } from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://utsavkumar3256:Utsav6523@cluster0.xlnejgc.mongodb.net/FoodDelivery').then(()=>console.log("DB Connected"))
}