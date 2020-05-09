const mongoose=require('mongoose');
const returnedSchema=new mongoose.Schema({
   orderId:{
      type:Number,
      required:true
   }
},{timestamps:true});
module.exports=mongoose.model('Returned',returnedSchema);