const mongoose=require('mongoose');
const deliveredSchema=mongoose.Schema({
   orderId:{
      type:Number,
      required:true
   },
   actualDeliveryDate:{
      type:Date,
      required:true
   }

},{timestamps:true});
module.exports=mongoose.model("Delivered",deliveredSchema);