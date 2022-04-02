const Admin=require("../model/adminModel.js");

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");


// const addAdmin=async(req,res)=>{
//     try{
//    let {email,password}=req.body;
    
// //    validation
// if(password.length<4){
//     return res.status(404).json({
//         errorMessage:"enter password of at least 4 characters"
//     });
// }

// const existingAdmin=await Admin.findOne({email});

// if(existingAdmin){
//     return res.status(400).json({
//         errorMessage:'this email account already exist'
//     })
// }



// // password hashing

// const salt=await bcrypt.genSalt();
// password=await bcrypt.hash(password,salt);


// const newAdmin=new Admin({
//     email,password
// });


// const savedAdmin=await newAdmin.save();


// // jwt

// const token=jwt.sign({
//     admin:savedAdmin.id
// },process.env.JWT_SECRET)


// res.cookie("token",token,{
//     httpOnly:true
// }).send();



//     }
//     catch(err){
//         console.log(err);
//         res.status(500).send();
//     }
// }




const loginAdmin=async(req,res)=>{
    try{
        const {email,password}=req.body;

        // validate

        const existingAdmin=await Admin.findOne({email});

        if(!existingAdmin){
            return res.status(400).json({
                errorMessage:"wrong credentials"
            })
        }


        // password matching boolean
        const passwordCorrect=await bcrypt.compare(password,existingAdmin.password);

        if(!passwordCorrect){
            return res.status(400).json({
                errorMessage:"wrong credentials"
            });
        }

        const token=jwt.sign({
            admin:existingAdmin._id
        },process.env.JWT_SECRET);



        // send the token in the http only cookies

        res.cookie("token",token,{
            httpOnly:true
        }).json(existingAdmin);


        // return res.status(200).json({
        //     status: 'success',
        //     data: existingAdmin,
        //     token: token,
        //   });


    }
    catch(err){
        console.log(err)
        res.status(500).send();
    }
}




const logoutAdmin=(req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires:new Date(0),
    }).send();
}




const loggedInAdmin=(req,res)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.json(false);
        }

        jwt.verify(token,process.env.JWT_SECRET);

        return res.json(true);
    }
    catch(err){
        return res.json(false);
    }
}






const updateAdmin=async(req,res)=>{
    try{
   let {id,email,password}=req.body;
    
//    validation
if(password.length<4){
    return res.status(404).json({
        errorMessage:"enter password of at least 4 characters"
    });
}

const existingAdmin=await Admin.findOne({email});

if(!existingAdmin){
    return res.status(400).json({
        errorMessage:'this email does not exist'
    })
}



// password hashing

const salt=await bcrypt.genSalt();
password=await bcrypt.hash(password,salt);



const updateObj={
    _id:id,email,password
}


// const savedAdmin=await newAdmin.save();

const savedAdmin=await Admin.findOneAndUpdate({_id:id},updateObj);


// jwt

const token=jwt.sign({
    admin:savedAdmin._id
},process.env.JWT_SECRET)


res.cookie("token",token,{
    httpOnly:true
}).send(savedAdmin);



    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}






module.exports={loginAdmin,logoutAdmin,loggedInAdmin,updateAdmin};