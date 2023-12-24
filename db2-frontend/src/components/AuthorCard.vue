<script setup lang="ts">
import { IBadge, IButton, ICard, ILink } from '@inkline/inkline'

import { Author } from '@/interfaces.ts'

defineProps<{
  author: Author
}>()
</script>

<template>
  <ICard>
    <div class="_display:flex">
      <div class="_flex-grow:1">
        <h2 class="_color:primary!">
          {{ author.name }}
        </h2>
      </div>
      <div>
        <IButton outline color="primary" :to="{ name: 'ViewAuthor', params: { id: author.id } }">
            <FontAwesomeIcon icon="circle-info" class="_margin-right:1/2" />
            Detalles
        </IButton>
      </div>
    </div>
    <div class="_display:flex">
      <div class="_flex-grow:1">
        <p class="_color:gray! _margin-bottom:1/2">{{ author.bibliography }}</p>
      </div>
      <div class="no-wrap">
        <div class="_margin-bottom:1/2">
          <IBadge v-for="category in author.categories" :key="category.id" class="_margin-x:1/4">
            {{ category.name }}
          </IBadge>
        </div>
        <div class="_text-align:right">Libros: {{ author.books.length }}</div>
      </div>
    </div>
  </ICard>
</template>

<style scoped>
.no-wrap {
  flex-shrink: 0;
}
</style>
