const mongoose=require('mongoose');
const cancelledSchema=new mongoose.Schema({
   orderId:{
      type:Number,
      required:true
   },
   cancellationOrigin:{
      type:String,
      required:true
   }
},{timestamps:true});
module.exports=mongoose.model('Cancelled',cancelledSchema);