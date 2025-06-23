import mongoose from 'mongoose';

const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{
        type:Array,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Food Processing"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:Boolean,
        default:false
    },
    amount:{
        type:Number,
        required:true
    }
})

const orderModel=mongoose.model.order || mongoose.model("order",orderSchema)
export default orderModel;