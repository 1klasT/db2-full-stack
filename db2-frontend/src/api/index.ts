import { snakeCase } from 'change-case/keys'

import { Author, Book, Category, Client } from '../interfaces.ts'
import { apiFetch } from './utilities.ts'

async function getBooks(filters: { availableCopiesOnly: boolean }): Promise<Book[]> {
  // Obtener todos los libros sin filtrar
  let allBooks = await apiFetch<Book[]>('/books');

  // Aplicar filtro por copias disponibles si es necesario
  if (filters.availableCopiesOnly) {
    allBooks = allBooks.filter(book => book.copies > 0);
  }

  return allBooks;
}

async function getBook(bookId: number | string): Promise<Book> {
  return apiFetch<Book>(`/books/${bookId}`)
}

async function postBook(book: Book) {
  return apiFetch<Book>('/books', 'POST', JSON.stringify(snakeCase(book)))
}

async function updateBook(book: Book) {
  return apiFetch<Book>(`/books/${book.id}`, 'PATCH', JSON.stringify(snakeCase(book)))
}

async function getAuthors(): Promise<Author[]> {
  return apiFetch<Author[]>('/authors')
}

async function getAuthor(authorId: number | string): Promise<Author> {
  return apiFetch<Author>(`/authors/${authorId}`)
}

async function postAuthor(author: Author) {
  return apiFetch<Author>('/authors', 'POST', JSON.stringify(snakeCase(author)))
}

async function getCategories() {
  return apiFetch<Category[]>('/categories')
}

async function getCategory(categoryId: number | string): Promise<Category> {
  return apiFetch<Category>(`/categories/${categoryId}`)
}

async function postCategory(category: Category) {
  return apiFetch<Category>('/categories', 'POST', JSON.stringify(snakeCase(category)))
}

async function getClients(): Promise<Client[]> {
  return apiFetch<Client[]>('/clients');
}

async function getClient(clientId: number | string): Promise<Client> {
  return apiFetch<Client>(`/clients/${clientId}`);
}

async function postClient(client: Client) {
  return apiFetch<Client>('/clients', 'POST', JSON.stringify(snakeCase(client)));
}

async function updateClient(client: Client) {
  return apiFetch<Client>(`/clients/${client.id}`, 'PATCH', JSON.stringify(snakeCase(client)));
}

export { getBooks, getBook, postBook, updateBook, getAuthors, getAuthor, postAuthor, getCategories, getCategory, postCategory, getClients, getClient, postClient, updateClient }
