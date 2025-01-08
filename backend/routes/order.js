const router = require("express").Router();
const { authenticationToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/order");

//place order
router.get("/place-order", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const OrderDataFromDB = await newOrder.save();

            //saving order in user model
            await User.findByIdAndUpdate(id, {
                $push: { cart: OrderDataFromDB._id },
            });
            //clearing cart
            await User.findByIdAndUpdate(id, {
                $pull: { cart: OrderDataFromDB._id },
            });
        }
        return res.json({
            status: "Success",
            message: "Order Place Successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Ann error occurred" });
    }
})

//get order history of particular user
router.get("/get-order-history", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });

        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        });

    } catch (error) {
        res.status(500).json({ message: "Ann error occurred" });
    }
})

//get all orders admin
router.get("/get-all-orders", authenticationToken, async (req, res) => {
    try {
        const userData = await Order.find().populate({
            path: "book",
        })
            .populate({
                path: "user"
            })
            .sort({
                createdAt: -1
            });
        return res.json({
            status: "Success",
            data: orderData,
        });

    } catch (error) {
        res.status(500).json({ message: "Ann error occurred" });
    }
})

//update order admin
router.get("/update-status/:id", authenticationToken, async (req, res) => {
    
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
        })
    } catch (error) {
        res.status(500).json({ message: "Ann error occurred" });
    }
})


module.exports = router;