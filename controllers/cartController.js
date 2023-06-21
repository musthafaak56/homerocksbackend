const mongoose = require('mongoose')
//import slabSchema

const users = require('../models/userSchema')


//add to cart logic
exports.addtocart = async (req, res) => {
    //get products details from request
    //using destructuring
    const { currentPhone, id, cartId, name, color, material, length, breadth, finish, availability, price, offer, measurement, quantity, image1, image2, total } = req.body


    //logic
    try {
        //check phone in mongodb
        const checkuser = await users.findOne({ phone: currentPhone })
        console.log(checkuser);

        //check item already present in cart 
        // const checkcartid = await users.findOne({ phone: currentPhone, cart: { $elemMatch: { id: id } } });

        // const cartItem = checkcartid.cart.find(item => item.material === 'granite');
        // if (quantity * measurement > availability) {
        //     total = price * measurement * quantity
        // }
        // else {
        //     res.status(401).json({ error: `Item Quantity Cannot be Greater than Stock Availabilit` })
        // }
        // checkuser.amount += total;

        const usercart = await users.findOneAndUpdate({ phone: currentPhone }, { $push: { cart: { id: id, cartId: cartId, name: name, color: color, material: material, length: length, breadth: breadth, finish: finish, availability: availability, price: price, offer: offer, measurement: measurement, quantity: quantity, image1: image1, image2: image2, total: total } } }, { new: true })
        // usercart.cart.forEach(item=>console.log(item))
        if (usercart) {
            res.status(200).json({ message: `Item added to cart`, usercart })
        } else {
            res.status(401).json("Error while adding Item to Cart")
        }
    }
    catch (error) {
        console.log(`error at 401`);
        res.status(401).json({ error: `Function addtocart Not working` })
    }
}


//get carts
exports.getcart = async (req, res) => {

    //get id from request
    const currentPhone = req.params.currentPhone

    //logic
    try {
        //check phone in mongodb
        const checkuser = await users.findOne({ phone: currentPhone })
        console.log(checkuser.cart);
        const cartItems = checkuser.cart;
        res.status(200).json(cartItems)
    }
    catch (error) {
        res.status(401).json({ error: `get Cart error` })
    }

}

exports.removefromcart = async (req, res) => {

    //destructuring
    const { currentPhone, cartId } = req.params;
    // const currentPhone=req.params.currentPhone
    // const cartId=req.params.cartId

    try {
        //check phone in mongodb
        const checkuser = await users.findOne({ phone: currentPhone })
        console.log(`cartId=`, cartId)
        // console.log(`checkuser.cart outside loop=`, checkuser.cart)

        try {
            for (let i = 0; i < checkuser.cart.length; i++) {
                // console.log(`checkuser.cart inside loop`, checkuser.cart[i])
                if (checkuser.cart[i].cartId.toString() == cartId.toString()) {
                    //splice(starting index,remove count)
                    // console.log(`checkuser.cart[i] inside if= `, checkuser.cart[i]);
                    checkuser.cart.splice(i, 1)
                    checkuser.save()
                    const cartItems = checkuser.cart;
                    return res.status(200).json(cartItems)
                }
            }
            // res.status(401).json({error:'cart item not found'})
        } catch (error) {
            return res.status(401).json(error)
        }

    }
    catch (error) {
        res.status(401).json(error)
    }
}


//logic to edit items in cart
exports.editcart = async (req, res) => {

    const { currentPhone } = req.params;

    const { id, cartId, name, color, material, length, breadth, finish, availability, price, offer, measurement, quantity, image1, image2, total } = req.body;

    try {
        // Find the user in the MongoDB collection
        const checkuser = await users.findOne({ phone: currentPhone });

        try {
            for (let i = 0; i < checkuser.cart.length; i++) {
                // console.log(`checkuser.cart inside loop`, checkuser.cart[i])
                if (checkuser.cart[i].cartId.toString() == cartId.toString()) {
                    //splice(starting index,remove count)
                    // console.log(`checkuser.cart[i] inside if= `, checkuser.cart[i]);
                    // Update the cart item with the new values
                    checkuser.cart[i] = {...checkuser.cart[i],id,name, color, material, length, breadth, finish, availability, price, offer, measurement, quantity, image1, image2, total};

                    // Save the updated user document
                    await checkuser.save();
                    const cartItems = checkuser.cart[i];
                    return res.status(200).json(cartItems)
                }
            }
            // res.status(401).json({error:'cart item not found'})
        } catch (error) {
            return res.status(401).json(error)
        }

    } catch (error) {
        // Handle any errors that occur during the update process
        res.status(500).json({ error: 'Error updating cart item' });
    }
}

