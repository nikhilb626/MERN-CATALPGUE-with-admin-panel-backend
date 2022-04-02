const Order=require("../model/orderModel.jsx");


const addOrder=async(req,res)=>{
    try{
        const {name,email,phone,description,product,SentDate}=req.body;

        const existingOrder=await Order.findOne({email});

        if(existingOrder){
            res.status(400).json({
                errorMessage:"query already sent"
            })
        }
        else{
            const newOrder=new Order({
                name,email,phone,description,product,SentDate
            });

            
            const savedOrder=await newOrder.save();

            res.json(savedOrder);



        }


    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}





const getOrders=async(req,res)=>{
    try{
        const getOrder=await Order.find().sort({ $natural: -1 });
        res.json(getOrder);

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}




const countOrders=async(req,res)=>{
    try{
        const countOrder=await Order.countDocuments({});
        res.json(countOrder);

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}



const getOrderbyId=async(req,res)=>{
    const id=req.params.id;

    try{
        const getOrder=await Order.find({_id:id});
        res.json(getOrder);
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
}







module.exports={addOrder,getOrders,countOrders,getOrderbyId};