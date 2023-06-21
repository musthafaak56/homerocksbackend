//import mongoose
const mongoose = require('mongoose')

//import model
const users = require('../models/userSchema')


//add to wishlist logic
exports.addtowishlist = async (req, res) => {
    //get products details from request
    //using destructuring
    const { currentPhone, id, name, color, material, thickness, length, breadth, finish, availability, price, offer, measurement, quantity, image1, image2, backimage } = req.body


    //logic
    try {
        //check phone in mongodb
        const checkuser = await users.findOne({ phone: currentPhone })
        // console.log(`checkuser.wishlist[1].id`, checkuser.wishlist[0].id);

        try {
            if (checkuser.wishlist.length > 0) {
                for (let i = 0; i < checkuser.wishlist.length; i++) {
                    console.log(`checkuser.wishlist.id inside loop`, checkuser.wishlist[i].id, id)

                    if (checkuser.wishlist[i].id == id) {
                        return res.status(401).json("Item already Exist in Wishlist")
                    }
                }
                const userwishlist = await users.findOneAndUpdate({ phone: currentPhone }, { $push: { wishlist: { id: id, name: name, color: color, material: material, thickness: thickness, length: length, breadth: breadth, finish: finish, availability: availability, price: price, offer: offer, measurement: measurement, quantity: quantity, image1: image1, image2: image2, backimage: backimage } } }, { new: true })
                // userwishlist.wishlist.forEach(item => console.log(item.id))
                if (userwishlist) {
                    return res.status(200).json(userwishlist)
                } else {
                    return res.status(401).json({ error: "Error while adding Item to Wishlist" })
                }
            }
            // console.log(`checkuser.wishlist[1].id`, checkuser.wishlist[0].id);
            const userwishlist = await users.findOneAndUpdate({ phone: currentPhone }, { $push: { wishlist: { id: id, name: name, color: color, material: material, thickness: thickness, length: length, breadth: breadth, finish: finish, availability: availability, price: price, offer: offer, measurement: measurement, quantity: quantity, image1: image1, image2: image2, backimage: backimage } } }, { new: true })
            // userwishlist.wishlist.forEach(item=>console.log(item))
            if (userwishlist) {
                return res.status(200).json(userwishlist)
            } else {
                return res.status(401).json({ error: "Error while adding Item to Wishlist" })
            }

        } catch (error) {
            res.status(401).json({ error: `catch ${error}` })
        }

    }
    catch (error) {
        console.log(`error at 401`)
        res.status(401).json({ error: `addtowishlist Not working` })
    }
}



//get wishlists
exports.getwishlist = async (req, res) => {

    //get id from request
    const currentPhone = req.params.currentPhone

    //logic
    try {
        //check phone in mongodb
        const checkuser = await users.findOne({ phone: currentPhone })
        console.log(checkuser.wishlist);
        const wishlistItems = checkuser.wishlist;
        res.status(200).json(wishlistItems)
    }
    catch (error) {
        res.status(401).json({ error: `get wishlist error` })
    }

}





exports.removefromwishlist = async (req, res) => {

    //destructuring
    const { currentPhone, id } = req.params;
    // const currentPhone=req.params.currentPhone

    try {
        //check phone in mongodb
        const checkuser = await users.findOne({ phone: currentPhone })
        // console.log(`id=`, users.wishlist[users.wishlist.length-1].id)
        // console.log(`checkuser.wishlist outside loop=`, checkuser.wishlist)

        try {
            for (let i = 0; i < checkuser.wishlist.length; i++) {
                // console.log(`checkuser.wishlist inside loop`, checkuser.wishlist[i])
                if (checkuser.wishlist[i].wishlistId == id) {
                    //splice(starting index,remove count)
                    console.log(`checkuser.wishlist[i] inside if= `, checkuser.wishlist[i]);
                    checkuser.wishlist.splice(i, 1)
                    checkuser.save()
                    const wishlistItems = checkuser.wishlist;
                    return res.status(200).json(wishlistItems)
                }
            }
            // res.status(401).json({error:'wishlist item not found'})
        } catch (error) {
            return res.status(401).json({ error: `${error}` })
        }

    }
    catch (error) {
        res.status(401).json(error)
    }
}
