<script setup lang="ts">
import { IButton, ICheckbox, IColumn, IContainer, IIcon, ILoader, IRow } from '@inkline/inkline'
import { reactive, ref } from 'vue'

import { getBooks } from '@/api'
import { Book } from '@/interfaces.ts'

import BookCard from '@/components/BookCard.vue'

const books: Book[] = reactive([])
const loading = ref(false)
const sortOption = ref('id')

const categories = reactive([
  { name: 'Ficción', selected: false },
  { name: 'No ficción', selected: false },
  { name: 'Ciencia ficción', selected: false },
]);

const availableCopiesOnly = ref(false);

const loadBooks = async () => {
  loading.value = true;

  const selectedCategories = categories.filter(category => category.selected).map(category => category.name);

  const filters = {
    sortBy: sortOption.value,
    availableCopiesOnly: availableCopiesOnly.value,
    categories: selectedCategories,
  };

  const filteredBooks = await getBooks(filters);

  books.splice(0, books.length, ...filteredBooks);

  loading.value = false;
};

loadBooks();
</script>

<template>
  <IContainer>
    <IRow>
      <IColumn class="_display:flex! _justify-content:end!">
        <IButton color="primary" :to="{ name: 'NewBook' }">
          <template #icon>
            <IIcon name="ink-plus" />
          </template>
          Nuevo libro
        </IButton>
      </IColumn>
    </IRow>

    <IRow class="_margin-top:2!">
      <IColumn xs="12" class="_text-align:right!">
        <label for="sort">Ordenar por:</label>
        <select id="sort" v-model="sortOption" @change="loadBooks">
          <option value="id">ID</option>
          <option value="title">Título</option>
          <option value="year">Año</option>
        </select>
      </IColumn>
    </IRow>

    <IRow class="_margin-top:2!">
      <IColumn xs="12" class="_text-align:right!">
        <ICheckbox v-model="availableCopiesOnly" @update:modelValue="loadBooks">
          Solo libros con copias disponibles
        </ICheckbox>
      </IColumn>
    </IRow>

    <IRow class="_margin-top:2!">
      <IColumn xs="12" class="_text-align:right!">
        <label>Categorías:</label>
        <div>
          <ICheckbox
            v-for="category in categories"
            :key="category.name"
            v-model="category.selected"
            @update:modelValue="loadBooks"
          >
            {{ category.name }}
          </ICheckbox>
        </div>
      </IColumn>
    </IRow>

    <IRow class="_margin-top:2!">
      <div v-if="loading" class="_margin-x:auto _margin-top:5">
        <ILoader />
      </div>
      <template v-else>
        <IColumn v-for="book in books" :key="book.id" xs="12" md="6" class="_margin-bottom:2!">
          <BookCard :book="book" />
        </IColumn>
      </template>
    </IRow>
  </IContainer>
</template>
