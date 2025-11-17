const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for books
let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
    { id: 3, title: "1984", author: "George Orwell" }
];

// Helper variable to generate unique IDs
let nextId = 4;

// GET /books - Return all books
app.get('/books', (req, res) => {
    res.json({
        success: true,
        message: 'Books retrieved successfully',
        data: books
    });
});

// GET /books/:id - Return a specific book by ID
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id);
    
    if (!book) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    res.json({
        success: true,
        message: 'Book retrieved successfully',
        data: book
    });
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;
    
    // Validation
    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: 'Title and author are required'
        });
    }
    
    const newBook = {
        id: nextId++,
        title: title,
        author: author
    };
    
    books.push(newBook);
    
    res.status(201).json({
        success: true,
        message: 'Book added successfully',
        data: newBook
    });
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author } = req.body;
    
    // Validation
    if (!title || !author) {
        return res.status(400).json({
            success: false,
            message: 'Title and author are required'
        });
    }
    
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    books[bookIndex] = {
        id: id,
        title: title,
        author: author
    };
    
    res.json({
        success: true,
        message: 'Book updated successfully',
        data: books[bookIndex]
    });
});

// DELETE /books/:id - Remove a book by ID
app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(book => book.id === id);
    
    if (bookIndex === -1) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        });
    }
    
    const deletedBook = books.splice(bookIndex, 1)[0];
    
    res.json({
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Books REST API is running!',
        endpoints: {
            'GET /books': 'Get all books',
            'GET /books/:id': 'Get a specific book',
            'POST /books': 'Add a new book',
            'PUT /books/:id': 'Update a book',
            'DELETE /books/:id': 'Delete a book'
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET    /books');
    console.log('  GET    /books/:id');
    console.log('  POST   /books');
    console.log('  PUT    /books/:id');
    console.log('  DELETE /books/:id');
});
