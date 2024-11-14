"use client"
import { useState, useEffect } from "react";

interface Book {
  id: string;
  title: string;
  description?: string;
  author?: string;
  coverUrl?: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>({ id: "", title: "", description: "", author: "", coverUrl: "" });
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); // State for selected book for view

  // Fetch books from Open Library API based on search query
  const searchBooks = async (query: string) => {
    if (query.length < 3) return; // Only search if query length > 2
    const res = await fetch(`https://openlibrary.org/search.json?q=${query}&limit=10`);
    const data = await res.json();
    const fetchedBooks = data.docs.map((book: any) => ({
      id: book.key,
      title: book.title,
      description: book.first_sentence ? book.first_sentence[0] : "No description available.",
      author: book.author_name ? book.author_name[0] : "Unknown author",
      coverUrl: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "https://via.placeholder.com/150x200?text=No+Cover",
    }));
    setBooks(fetchedBooks);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    searchBooks(e.target.value);
  };

  // Add new book (Post)
  const addBook = async () => {
    if (newBook.title) {
      await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
      setNewBook({ id: "", title: "", description: "", author: "", coverUrl: "" });
      fetchBooks();
    }
  };

  // Fetch Books
  const fetchBooks = async () => {
    const res = await fetch('/api/books');
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  // Open Book (View Book Details)
  const openBook = (book: Book) => {
    setSelectedBook(book);
  };

  // Close Book Modal
  const closeBook = () => {
    setSelectedBook(null);
  };

  // Edit Book (Put)
  const updateBook = async () => {
    if (editingBook) {
      await fetch('/api/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBook),
      });
      setEditingBook(null);
      fetchBooks();
    }
  };

  // Delete Book (Delete)
  const deleteBook = async (id: string) => {
    await fetch('/api/books', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state before data is fetched
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Books Collection</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search for books..."
          className="w-80 p-3 rounded-full shadow-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display Books */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <img
              src={book.coverUrl}
              alt={book.title}
              className="w-40 h-60 object-cover rounded-md mb-4 mx-auto"
            />
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">{book.title}</h2>
            <p className="text-gray-600 text-sm mb-4 text-center">{book.description}</p>
            <p className="text-gray-500 text-sm text-center">{book.author}</p>

            <div className="flex justify-center space-x-3 mt-4">
              <button
                onClick={() => {
                  setEditingBook(book);
                  setNewBook(book);
                }}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteBook(book.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Delete
              </button>
              <button
                onClick={() => openBook(book)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Book Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Book</h2>
        <input
          type="text"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          placeholder="Book Title"
          className="w-full p-3 rounded-md mb-4 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={newBook.description}
          onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
          placeholder="Book Description"
          className="w-full p-3 rounded-md mb-4 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          placeholder="Author"
          className="w-full p-3 rounded-md mb-4 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addBook}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Add Book
        </button>
      </div>

      {/* Book Details Modal */}
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">{selectedBook.title}</h2>
            <img
              src={selectedBook.coverUrl}
              alt={selectedBook.title}
              className="w-40 h-60 object-cover rounded-md mb-4 mx-auto"
            />
            <p className="text-gray-600 text-sm mb-4">{selectedBook.description}</p>
            <p className="text-gray-500 text-sm">{selectedBook.author}</p>
            <button
              onClick={closeBook}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
