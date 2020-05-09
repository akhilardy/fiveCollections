const mongoose=require('mongoose');
const shippedSchema=new mongoose.Schema({
   orderId:{
      type:Number,
      required:true
   },
   actualShipDate:{
      type:Date,
      required:true

   }

},{timestamps:true});
module.exports=mongoose.model('Shipped',shippedSchema);