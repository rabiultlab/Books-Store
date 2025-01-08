const router = require("express").Router();
const User = require("../models/user");
const { authenticationToken } = require("./userAuth");

//put book to cart
//add to cart
router.put("/add-to-cart", authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.json({
                status: "Success",
                message: "Book is already in cart"
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid }
        });
        return res.json({
            status: "Success",
            message: "Book added to cart"
        })
    } catch (error) {
        res.status(500).json({ message: "Ann error occurred" });
    }
})

//remove to cart
router.put("/remove-from-cart/:bookid", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid }
        });
        return res.json({
            status: "Success",
            message: "Book removed from cart"
        })
    } catch (error) {
        res.status(500).json({ message: "Ann error occurred" });
    }
})

//get of a particular user
router.get("/get-user-cart", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status: "Success",
            data: cart,
        });

    } catch (error) {
        res.status(500).json({ message: "Ann error occurred" });
    }
})

module.exports = router;