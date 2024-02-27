const express = require('express');
let getBooks = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (username && password) {
        const existingUser = users.find((user) => user.username === username);
        if (!existingUser) {
            users.push({ "username": username, "password": password });
            return res.status(200).json({ message: "User successfully registred. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    getBooks().then((books) => {
        res.status(200).json(books);
    }).catch((error) => {
        res.status(500).json({ message: "Error fetching books data" });
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    if (isbn) {
        getBooks().then((books) => {
            const book = books[isbn];
            if (book)
                return res.status(200).json(book);
            else
                return res.status(400).json({ message: "Unable to find book" });
        })
    } else
        return res.status(400).json({ message: "Unable to find book" });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author.toLocaleLowerCase();
    getBooks().then((books) => {
        let booksArray = Object.values(books);
        let booksByAuthor = booksArray.filter((book) => book.author.toLocaleLowerCase().includes(author));

        if (booksByAuthor.length > 0)
            return res.status(200).json(booksByAuthor);
        else
            res.status(404).json({ message: 'No books found written by the specified author' });
    })
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    getBooks().then((books) => {
        let booksArray = Object.values(books);
        let booksByTitle = booksArray.filter((book) => book.title.toLocaleLowerCase().includes(title));

        if (booksByTitle.length > 0)
            return res.status(200).json(booksByTitle);
        else
            res.status(404).json({ message: 'No books found by the specified title' });
    })
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book)
        return res.status(200).json(book.reviews);
    else
        return res.status(400).json({ message: "Unable to find book" });
});

module.exports.general = public_users;
