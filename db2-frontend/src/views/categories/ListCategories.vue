<script setup lang="ts">
import { IButton, IColumn, IContainer, IIcon, ILoader, IRow } from '@inkline/inkline'
import { reactive, ref } from 'vue'

import { getCategories } from '@/api'
import { Category } from '@/interfaces.ts'

import CategoryCard from '@/components/CategoryCard.vue'

const categories: Category[] = reactive([])
const loading = ref(false)

const loadCategories = async () => {
  loading.value = true
  Object.assign(categories, await getCategories())
  loading.value = false
}

loadCategories()
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center class="_margin-bottom:4">
      <IColumn xs="12">
        <IButton color="primary">
          <template #icon>
            <IIcon name="ink-plus" />
          </template>
          Nueva categoría
        </IButton>
      </IColumn>
    </IRow>
    <IRow class="_justify-center">
      <div v-if="loading" class="_margin-y:4">
        <ILoader />
      </div>
      <template v-else>
        <IColumn v-for="category in categories" :key="category.id" md="4" class="_margin-bottom:2">
          <CategoryCard :category="category" class="_bg-gray-200 _rounded-md _shadow-md" />
        </IColumn>
      </template>
    </IRow>
  </IContainer>
</template>
