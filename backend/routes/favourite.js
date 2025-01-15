const router = require("express").Router();
const User = require("../models/user");
const { authenticationToken } = require("./userAuth");

//add book to favorite
router.put("/add-book-to-favorite", authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already fabourites" })
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } })
        return res.status(200).json({ message: "Book added to fabourites" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//remove favorite
router.put("/remove-book-from-favorite", authenticationToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } })
        }
       
        return res.status(200).json({ message: "Book remove from fabourites" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//get Favorite books of a particular user
router.get("/get-favorite-books", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
    
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = router;