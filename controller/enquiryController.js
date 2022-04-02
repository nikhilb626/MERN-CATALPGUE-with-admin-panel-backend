// const Enquiry=require("../model/enquiryModel.js");



// const addEnquiry=async(req,res)=>{
//     try{
//     const {name,email,phone,subject,message,enqDate}=req.body;

//     const existingEnquiry=await Enquiry.findOne({email});

//     if(existingEnquiry){
//         res.status(400).json({
//             errorMessage:"Enquiry already Sent"
//         })
//     }
//     else{
//         const newEnquiry=new Enquiry({
//             name,email,phone,subject,message,enqDate
//         });
    
//         const savedEnquiry=await newEnquiry.save();
    
//         res.json(savedEnquiry);
    
//     }

//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send();
//     }
// }




// const getAllEnquiry=async(req,res)=>{
//     try{
//     const allEnquiry=await Enquiry.find().sort({ $natural: -1 });
//     res.json(allEnquiry);

//     }
//     catch(err){
//         res.status(400).send();
//     }
// }



// const getEnquirybyId=async(req,res)=>{
    
//     const id=req.params.id;
    
//     try{
//     const Enquirydata=await Enquiry.find({_id:id});
//     res.json(Enquirydata);

//     }
//     catch(err){
//         res.status(400).send();
//     }
// }



// const countEnquiry=async(req,res)=>{
//     try{
//     const getEnquiry=await Enquiry.countDocuments({});
//     res.json(getEnquiry);

//     }
//     catch(err){
//         res.status(400).send();
//     }
// }



// module.exports={addEnquiry,getAllEnquiry,countEnquiry,getEnquirybyId};