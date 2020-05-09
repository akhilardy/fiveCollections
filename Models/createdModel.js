const mongoose=require('mongoose');
const createdSchema=new mongoose.Schema({
   orderId:{
      type:Number,
      required:true
   },
   orderDate:{
      type:Date,
      required:true
   },
   sellerId:{
      type:Number,
      required:true
   },
   promisedShipDate:{
      type:Date,
      required:true
   },
   promisedDeliveryDate:{
      type:Date,
      required:true
   }
},{timestamps:true});
module.exports=mongoose.model('Created',createdSchema);