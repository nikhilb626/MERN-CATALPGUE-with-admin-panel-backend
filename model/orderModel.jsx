const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true},
    // location:{type:String,required:true},
    description:{type:String,required:true},
    SentDate:{type:String,required:true},
    product: [{
        name:{type:String,required:true},
        src:{type:String,required:true},
        model:{type:String,required:true},
        category:{type:String,required:true},
        // description:{type:String,required:true}
      }]
});



const Order=mongoose.model("order",orderSchema);

module.exports=Order;