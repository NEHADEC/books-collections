import { NextResponse } from 'next/server';

let books = [
  { id: '1', title: 'NEXT.JS', description: 'Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.    Under the hood, Next.js also abstracts and automatically configures tooling needed for React, like bundling, compiling, and more. This allows you to focus on building your application instead of spending time with configuration.Whether you re an individual developer or part of a larger team, Next.js can help you build interactive, dynamic, and fast React applicationsDescription',
     author: 'Neha', coverUrl: 'https://images.ctfassets.net/23aumh6u8s0i/3jY4eCzPqbJ8bP7RX8SnTe/d6252025eff38698a5ed4ffdbd02f580/nextjs_hero' },
];

// GET: Retrieve the list of books
export async function GET() {
  return NextResponse.json(books, { status: 200 });
}

// POST: Add a new book
export async function POST(request: Request) {
  try {
    const newBook = await request.json();
    newBook.id = (books.length + 1).toString();
    books.push(newBook);
    return NextResponse.json(newBook, { status: 201 });
  } catch {
    return NextResponse.json({ message: 'Failed to add book' }, { status: 400 });
  }
}

// PUT: Update an existing book
export async function PUT(request: Request) {
  try {
    const updatedBook = await request.json();
    let bookExists = false;
    books = books.map((book) => {
      if (book.id === updatedBook.id) {
        bookExists = true;
        return updatedBook;
      }
      return book;
    });
    
    if (bookExists) {
      return NextResponse.json(updatedBook, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ message: 'Failed to update book' }, { status: 400 });
  }
}

// DELETE: Remove a book by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const initialLength = books.length;
    books = books.filter((book) => book.id !== id);

    if (books.length < initialLength) {
      return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
  } catch {
    return NextResponse.json({ message: 'Failed to delete book' }, { status: 400 });
  }
}
