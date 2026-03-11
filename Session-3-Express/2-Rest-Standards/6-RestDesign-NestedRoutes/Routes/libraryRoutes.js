const express = require('express')
const router = express.Router()


let authors = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];
let books = [
    { id: 1, title: 'Clean Code', authorId: 1 },
    { id: 2, title: 'Refactoring', authorId: 1 },
    { id: 3, title: 'SICP', authorId: 2 },
];


// TODO: GET /api/authors
router.get('/authors', (req, res) => {
    res.status(200).json(authors)
})
// TODO: GET /api/authors/:id
router.get('/authors/:id', (req, res) => {
    const { id } = req.params
    const user = authors.filter(x => x.id == id)
    if (!user) {
        return res.status(404).json({ message: "user not find for given id" })
    }
    res.status(200).json(user[0])
})
// TODO: GET /api/authors/:id/books
router.get('/authors/:id/books', (req, res) => {
    const { id } = req.params
    const book = books.filter(x => x.authorId == id).map(x => x.title)
    if (book.length < 1) {
        return res.status(404).json({ message: "Author Not Found" })
    }
    res.status(200).json(book)
})
// TODO: POST /api/authors/:id/books
router.post('/authors/:id/books', (req, res) => {
    const { id } = req.params
    const { title } = req.body
    const newBook = { id: books.at(-1).id + 1, title: title, authorId: id }
    
    books.push(newBook)
    res.status(201).json(newBook)
})
// TODO: GET /api/books
router.get('/books', (req, res) => {
    res.status(200).json(books)
})

module.exports = router