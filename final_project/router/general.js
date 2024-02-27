const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (isbn) {
        const book = books[isbn];
        if (book)
            return res.status(200).json(book);
        else
            return res.status(400).json({ message: "Unable to find book" });
    } else
        return res.status(400).json({ message: "Unable to find book" });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLocaleLowerCase();
    let booksArray = Object.values(books);
    let booksByAuthor = booksArray.filter((book) => book.author.toLocaleLowerCase().includes(author));

    if (booksByAuthor.length > 0)
        return res.status(200).json(booksByAuthor);
    else
        res.status(404).json({ message: 'No books found written by the specified author' });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const author = req.params.title;
    let booksArray = Object.values(books);
    let booksByTitle = booksArray.filter((book) => book.title.toLocaleLowerCase() === title.toLocaleLowerCase());

    if (booksByTitle.length > 0)
        return res.status(200).json(booksByTitle);
    else
        res.status(404).json({ message: 'No books found written by the specified author' });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
