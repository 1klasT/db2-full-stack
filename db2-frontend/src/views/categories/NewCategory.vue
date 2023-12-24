<script setup lang="ts">
import { IColumn, IContainer, IRow } from '@inkline/inkline'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { getCategories, postCategory } from '@/api'
import { Category } from '@/interfaces.ts'

import CategoryForm from '@/components/forms/CategoryForm.vue'

const router = useRouter()
const category: Category = reactive({
  name: '',
})

const loadCategories = async () => {
  Object.assign(categories, await getCategories())
}

const saveCategory = async (updatedCategory: Category) => {
  Object.assign(category, updatedCategory)
  await postCategory(category)
  await loadCategories()
  await router.push({ name: 'ListCategories' })
}

loadCategories()
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center>
      <IColumn md="8" lg="6">
        <h1 class="_color:primary _text-center _text-2xl">Nueva Categoría</h1>
        <CategoryForm
          :category="category"
          @save-category="saveCategory"
          @cancel="router.push({ name: 'ListCategories' })"
          class="_p-4 _rounded-md _border-b"
        ></CategoryForm>
        <IRow around class="_justify-right">
          <IButton outline color="primary" class="_margin-right:1/2">
            Cancelar
          </IButton>
          <IButton color="primary">Guardar</IButton>
        </IRow>
      </IColumn>
    </IRow>
  </IContainer>
</template>