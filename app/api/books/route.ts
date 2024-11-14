
import { NextResponse } from 'next/server';

let books = [
  // Example book
  { id: '1', title: 'Sample Book', description: 'Description', author: 'Author', coverUrl: 'https://via.placeholder.com/150x200' },
];

export async function GET() {
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const newBook = await request.json();
  newBook.id = (books.length + 1).toString();
  books.push(newBook);
  return NextResponse.json(newBook);
}

export async function PUT(request: Request) {
  const updatedBook = await request.json();
  books = books.map(book => book.id === updatedBook.id ? updatedBook : book);
  return NextResponse.json(updatedBook);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  books = books.filter(book => book.id !== id);
  return NextResponse.json({ message: 'Book deleted successfully' });
}
