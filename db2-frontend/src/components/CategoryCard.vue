<script setup lang="ts">
import { IButton, ICard } from '@inkline/inkline'

import { Category } from '@/interfaces.ts'

defineProps<{
  category: Category
}>()
</script>

<template>
    <ICard>
      <div class="_display:flex">
        <div class="_flex-grow:1">
          <h2 class="_color:primary!">
            {{ category.name }}
          </h2>
        </div>
        <div>
          <ILink :href="'/categories/' + category.id">
            <IButton outline color="primary">
              <FontAwesomeIcon icon="circle-info" class="_margin-right:1/2" />
              Detalles
            </IButton>
          </ILink>
        </div>
      </div>
      <div class="_text-align:right">Libros: {{ category.books.length }}</div>
    </ICard>
  </template>

<style scoped>
.no-wrap {
  flex-shrink: 0;
}
</style>
