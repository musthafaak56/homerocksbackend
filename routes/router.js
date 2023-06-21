//import express
const express=require('express')

// 	->using express create an object for router class inorder to setup 	     path
const router=new express.Router()

//import jwtwebtoke
// const jwt=require('jwtwebtoken')

//import controllers
const userController=require('../controllers/userController')
const productController=require('../controllers/productController')
const cartController=require('../controllers/cartController')
const wishlistController=require('../controllers/wishlistController')

//application specific middleware
const appMiddleware =(req,res,next)=>{
    next()
    console.log(`Application specific middleware`);
}

const server=express();

//using application specific middleware
server.use(appMiddleware)


//middleware for verifying token to check user is logined or not 
jwtMiddleware = (req, res, next) => {
    const token = req.headers['verify-token'];
    console.log(token);

    try {
        const data = jwt.verify(token,'sk23');
        console.log(data);
        next();
    } catch {
        res.status(401).json({ message: 'please login' });
    }
    console.log('router specific middleware');
};

//using router specific middleware
server.use(router)


// router.post('/register', userController.register);
router.post('/signup',userController.signup)
//api call for login
router.post('/login', userController.login);

//api call to checkuser
router.get('/checkuser/:currentPhone',userController.checkuser)

//api call for getallproducts
router.get('/all-products', productController.getallproducts);
//api call for viewproduct
router.get('/view/:id', productController.viewproduct);
//api call to add product
router.post('/addproduct',productController.addproduct);
//api call to delete product
router.delete('/removeproduct/:id',productController.removeproduct);
//api call to update product
router.put('/updateproduct/:id',productController.updateproduct); 

//CART   //CART   //CART   //CART   //CART    //CART
//api call to add to cart
router.put('/addtocart',cartController.addtocart)
//api call to get cart
router.get('/getcart/:currentPhone',cartController.getcart)
//api call to remove item from cart
router.delete('/removefromcart/:currentPhone/:cartId',cartController.removefromcart)
//api call to edit item in cart
router.put('/editcart/:currentPhone',cartController.editcart)

//Wishlist   //Wishlist   //Wishlist   //Wishlist   //Wishlist    //Wishlist
//api call to add to wishlist
router.put('/addtowishlist',wishlistController.addtowishlist)
//api call to get wishlist
router.get('/getwishlist/:currentPhone',wishlistController.getwishlist)
//api call to remove item from wishlist
router.delete('/removefromwishlist/:currentPhone/:cartId',wishlistController.removefromwishlist)
//export router
module.exports= router