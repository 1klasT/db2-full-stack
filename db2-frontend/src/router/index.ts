import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import EditBook from '@/views/books/EditBook.vue'
import ListBooks from '@/views/books/ListBooks.vue'
import NewBook from '@/views/books/NewBook.vue'
import ViewBook from '@/views/books/ViewBook.vue'
import ListCategories from '@/views/categories/ListCategories.vue'
import NewCategory from '@/views/categories/NewCategory.vue'
import ViewCategory from '@/views/categories/ViewCategory.vue'
import EditAuthor from '@/views/authors/EditAuthor.vue'
import ListAuthors from '@/views/authors/ListAuthors.vue'
import NewAuthor from '@/views/authors/NewAuthor.vue'
import ViewAuthor from '@/views/authors/ViewAuthor.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/books/', component: ListBooks, name: 'ListBooks' },
  { path: '/books/new', component: NewBook, name: 'NewBook' },
  { path: '/books/:id', component: ViewBook, name: 'ViewBook' },
  { path: '/books/:id/edit', component: EditBook, name: 'EditBook' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
