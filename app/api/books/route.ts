import { NextResponse } from 'next/server';

let books = [
  { id: '1', title: 'Sample Book', description: 'Description', author: 'Author', coverUrl: 'https://via.placeholder.com/150x200' },
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
  } catch (error) {
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
  } catch (error) {
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
  } catch (error) {
    return NextResponse.json({ message: 'Failed to delete book' }, { status: 400 });
  }
}
