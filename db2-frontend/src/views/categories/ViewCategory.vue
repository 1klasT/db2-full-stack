<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IButton, IColumn, IContainer, IRow, ITable } from '@inkline/inkline'
import { Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

import { getCategory } from '@/api'
import { Category, Book } from '@/interfaces.ts'

const route = useRoute()
const category: Ref<Category | null> = ref(null)

const loadCategory = async () => {
  category.value = await getCategory(route.params.id as string)
}

loadCategory()
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center>
      <IColumn md="8" lg="6">
        <div class="_clearfix!">
          <IButton :to="{ name: 'EditCategory', params: { id: category?.id } }" outline color="primary" class="_float:left!">
            <FontAwesomeIcon icon="edit" class="_margin-right:1/2"></FontAwesomeIcon>
            Modificar
          </IButton>
        </div>
        <h1 class="_color:primary _text-center _text-2xl">{{ category?.name }}</h1>

        <h3 class="_color:primary _text-center _mt-4">Libros</h3>
        <ITable v-if="category?.books.length > 0" border condensed class="_rounded-md _shadow-md _mt-4">
          </ITable>
        <template v-else>
          <p class="_text-center _mt-4">No existen libros en esta categoría.</p>
        </template>
      </IColumn>
    </IRow>
  </IContainer>
</template>


<style scoped></style>
