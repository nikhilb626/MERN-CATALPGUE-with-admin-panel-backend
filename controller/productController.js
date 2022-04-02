const Product=require("../model/productModel.js");
const fs = require('fs')




const addProduct=async(req,res)=>{
    try{
        const {name,src,model,category}=req.body;

        const existingProduct=await Product.findOne({model});

        if(existingProduct){
            res.status(400).json({
                errorMessage:"This product already existed"
            })
        }
        else{

            console.log("this is product name ",name);

            const newProduct=new Product({
                name,src,model,category
            });


            
            const savedProduct=await newProduct.save();

            res.json(savedProduct);



        }


    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}


const getProducts=async(req,res)=>{
    try{
        const getProduct=await Product.find().sort({ $natural: -1 });
        res.json(getProduct);

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}


const getProductByCat=async(req,res)=>{
    const category=req.params.category;
    try{

        const getProduct=await Product.find({category:category}).sort({ $natural: -1 });
        res.json(getProduct);
    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}


const getFeaturedProducts=async(req,res)=>{
    try{
        const getTutors=await Product.find().sort({ $natural: -1 }).limit(8);
        res.json(getTutors);

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}


// const getProductById=async(req,res)=>{
//     const id=req.params.id;

//     try{
//         const getProduct=await Product.find({_id:id});
//         res.json(getProduct);
//     }catch(err){
//         console.log(err);
//         res.status(500).send();
//     }
// }



const adminGetProducts=async(req,res)=>{
    try{
        const getProduct=await Product.find().sort({ $natural: -1 });
        res.json(getProduct);

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}


const adminGetProductByCat=async(req,res)=>{
    const category=req.params.category;
    try{

        const getProduct=await Product.find({category:category}).sort({ $natural: -1 });
        res.json(getProduct);
    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}




const countProducts=async(req,res)=>{
    try{
        const getProduct=await Product.countDocuments({});
        res.json(getProduct);

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}



const countProductByCat=async(req,res)=>{
    const category=req.params.category;
    try{

        const getProduct=await Product.countDocuments({category:category});
        res.json(getProduct);
    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}





const deleteProduct=async(req,res)=>{
    


    try{
        const user=await Product.findOne({_id:req.params.id});
        console.log(user.src);
        try {
            fs.unlinkSync(user.src.slice(1));
            //file removed
          } catch(err) {
            console.error(err)
          }

        await Product.deleteOne({_id:req.params.id});
        res.status(201).json("appointment deleted successfully");
         

    }catch(err){
        res.status(409).json({message:err.message})
    }
}





const getAdminProductById=async(req,res)=>{
    const id=req.params.id;

    try{
        const getProduct=await Product.find({_id:id});
        res.json(getProduct);
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
}







const updateProduct=async(req,res)=>{

    const id=req.params.id;

   
    try{


        if(req.body.del===""){
            const updatedProductItem={
                _id:id,
                name:req.body.name,
                model:req.body.model,
                category:req.body.category,
                // description:req.body.description,
                src:req.body.src
    
            }
    
            
    
            const updatedDone=await Product.findOneAndUpdate({_id:req.params.id},updatedProductItem);
            res.json(updatedDone);
    
     }else if(req.body.del!==""){
         const deleteSrc=req.body.del;
        try {
            fs.unlinkSync(deleteSrc.slice(1));
            //file removed
          } catch(err) {
            console.error(err)
          }


          const updatedProductItem={
            _id:id,
            name:req.body.name,
            model:req.body.model,
            category:req.body.category,
            // description:req.body.description,
            src:req.body.src

        }

        

        const updatedDone=await Product.findOneAndUpdate({_id:req.params.id},updatedProductItem);
        res.json(updatedDone);


     }



  
    }
    catch(err){
        res.status(409).json({
            message:err.message
        })
    }

}





module.exports={addProduct,getProducts,getProductByCat,getFeaturedProducts,adminGetProductByCat,adminGetProducts,countProducts,countProductByCat,deleteProduct,getAdminProductById,updateProduct};


// ,getProductById