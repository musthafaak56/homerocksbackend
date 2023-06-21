
//get all products logic

//import product collection
const products= require('../models/productSchema')

exports.getallproducts= async (req,res)=>{
    //logic
    try{
        //get all products from product collection in mongodb
        const allproducts = await products.find()
        res.status(200).json(allproducts)
    }
    catch(error){
        res.status(401).json(error)
    }
}


exports.viewproduct= async(req,res)=>{
    //get id from request
    const id = req.params.id
    //logic
    try{
        //check id in mongodb
        const product= await products.findOne({id})
        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json("Item Not Found")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//add to cart logic
exports.addproduct= async(req,res)=>{
    //get products details from request
    //using destructuring
    const {id,name,color,material,thickness,length,breadth,finish,availability,price,offer,measurement,image1,image2,backimage}=req.body

    //logic
    try{
        //check id in mongodb
        const item= await products.findOne({id})
        //check product in cart

        if(item){
            // if(item.material){
            //     item.measurement=(item.length/12)*(item.breadth/12)
            //     console.log(item.measurement);
            // }
            //alert item already in cart
            res.status(401).json("Item Already in Cart")
            // res.status(200).json(item)
        }else{
            //add item into the products
            const newItem=new products({id,name,color,material,thickness,length,breadth,finish,availability,price,offer,image1,image2,backimage,measurement})
            if(newItem.material){
                newItem.measurement=(newItem.length/12)*(newItem.breadth/12)
                console.log(newItem.measurement);
            }
            //to store newItem data in to mongodb
            await newItem.save()
            res.status(200).json(`Item Added to Shop`)
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}



//remove from products
exports.removeproduct=async(req,res)=>{
    //get id from the request
    const {id}=req.params

    //check if id present in mongodb
    try{
        const removeProduct=await products.deleteOne({id})
        if(removeProduct.deletedCount!=0){
            //get all products items after removing particular products item
            const remainingitems = await products.find()   //ngOnInit only works one time while starting the page
            res.status(200).json(remainingitems)
        }
        else{
            res.status(404).json(error)
        } 
    }
    catch(error){
        res.status(401).json(error)
    }
}


exports.updateproduct= async(req,res)=>{
    //get id from request
    const id1 = req.params.id
    //get products details from request
    //using destructuring
    const {id,name,color,material,thickness,length,breadth,finish,availability,price,offer,measurement,quantity,image1,image2,backimage}=req.body

    //logic
    try{
        //check id in mongodb
        const updatedItem= await products.findOneAndUpdate({id},{id,name,color,material,thickness,length,breadth,finish,availability,price,offer,measurement,quantity,image1,image2,backimage},{ new: true })
        //check product in cart
        if(updatedItem){
            res.status(200).json(`Product Details Updated `)
        }else{
            res.status(401).json("Product Not Found")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}
