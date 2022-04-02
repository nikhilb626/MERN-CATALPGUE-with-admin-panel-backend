const express=require("express");
const multer=require("multer");
const path=require("path");

const {getProductById,addProduct,getProducts,getProductByCat,getFeaturedProducts,adminGetProductByCat,adminGetProducts,countProducts,countProductByCat,deleteProduct,getAdminProductById,updateProduct}=require("../controller/productController");
const auth=require("../middleware/auth");


const router=express.Router();





const storage = multer.diskStorage({
    destination:function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename:function(req, file, cb) {
      cb(null,file.filename+"-"+Date.now()+path.extname(file.originalname))
    },
  });
  
  const upload = multer({ storage });
  
  router.post('/addImage', auth, upload.single('file'), (req, res,next) => {
    const file=req.file;
    if(!file){
      const error=new Error("please upload a file")
      error.httpStatusCode=400;
      return next(error)
    }
    res.send(`/${req.file.path}`);
  });
  



router.post("/addProduct",auth,addProduct);
router.get("/getProducts",getProducts);
router.get("/getProductCategory/:category",getProductByCat);
router.get("/getFeatured",getFeaturedProducts);
// router.get("/getproductbyid/:id",getProductById);
router.get("/getadminproducts",auth,adminGetProducts);
router.get("/getadmincat/:category",auth,adminGetProductByCat);

router.get("/countproducts",auth,countProducts);
router.get("/countproductcat/:category",auth,countProductByCat);

router.delete("/deleteproduct/:id",auth,deleteProduct);
router.get("/getadminproductid/:id",auth,getAdminProductById);
router.put("/updateproduct/:id",auth,updateProduct);



module.exports=router;

