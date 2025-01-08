const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticationToken } = require("./userAuth");


//add book admin
router.post("/add-book", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res
                .status(400)
                .json({ message: "You are not having access to perform admin work" });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "Book added Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//update book
router.put("/update-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        return res.status(200).json({ message: "Book update Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//delete boo admin
router.delete("/delete-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        return res.status(200).json({ message: "Book delete Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
})

//get all books
router.get("/get-all-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: books,
        });

    } catch (error) {
        res.status(500).json({ message: "Ann error occurred" });
    }
})

//get recently added books Limit 4
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        });

    } catch (error) {
        res.status(500).json({ message: "Ann error occurred " });
    }
})

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        });

    } catch (error) {
        res.status(500).json({ message: "Ann error occurred " });
    }
})

module.exports = router;
//1:31