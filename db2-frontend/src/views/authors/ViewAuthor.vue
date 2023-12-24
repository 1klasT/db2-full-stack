<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IBadge, IButton, IColumn, IContainer, IRow, ITable } from '@inkline/inkline'
import { Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

import { getAuthor } from '@/api'
import { Author, Book } from '@/interfaces.ts'

const route = useRoute()
const author: Ref<Author | null> = ref(null)

const loadAuthor = async () => {
  author.value = await getAuthor(route.params.id as string)
}

loadAuthor()
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center>
      <IColumn md="10" lg="8">
        <div class="_clearfix!">
          <IButton :to="{ name: 'EditAuthor', params: { id: author?.id } }" outline color="primary" class="_float:left!">
            <FontAwesomeIcon icon="edit" class="_margin-right:1/2"></FontAwesomeIcon>
            Modificar
          </IButton>
        </div>
        <h1 class="_color:primary _text-center _text-2xl">{{ author?.name }}</h1>
        <p v-if="author?.bibliography" class="_bg-gray-200 _p-4 _rounded-md">
          {{ author?.bibliography }}
        </p>
      </IColumn>
    </IRow>
    <IRow justify-center>
      <IColumn md="10" lg="8">
        <h3 class="_color:primary _text-center">Detalle</h3>
        <ITable border condensed class="_p-2 _rounded-md _shadow-md">
          <tbody>
            <tr>
              <th class="_text-align:center">Año de nacimiento</th>
              <td class="_text-align:center">{{ author?.dateOfBirth }}</td>
            </tr>
          </tbody>
        </ITable>
      </IColumn>
    </IRow>
  </IContainer>
</template>

<style scoped></style>