const express=require("express");
const dotenv=require('dotenv');
const bodyParser=require("body-parser");
const path=require("path");
const cookieParser=require("cookie-parser");
const cors=require("cors");



const app=express();


dotenv.config({path:"./config.env"});


require("./db/conn");



//     routers
// const EnquiryRoutes=require("./service/enquiryRouter.js");
const AdminRoutes=require("./service/adminRouter.js");
const ProductRoutes=require("./service/productRouter.js");
const OrderRoutes=require("./service/orderRouter.js");


app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(cookieParser());


 __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));



// app.use(express.static(path.join(__dirname, '/frontend/build')));



// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );




app.use(cors({
    origin:[`http://localhost:3000`],
    credentials:true
}));



//    using routers
// app.use("/enquiryapi",EnquiryRoutes);
app.use("/adminapi",AdminRoutes);
app.use("/productapi",ProductRoutes);
app.use("/orderapi",OrderRoutes);




 


const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})