<script setup lang="ts">
import { IColumn, IContainer, IRow } from '@inkline/inkline'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { postAuthor } from '@/api'
import { Author } from '@/interfaces.ts'

import AuthorForm from '@/components/forms/AuthorForm.vue'

const router = useRouter()
const author: Author = reactive({
  name: '',
  bibliography: '',
  dateOfBirth: '',
})

const saveAuthor = async (updatedAuthor: Author) => {
  Object.assign(author, updatedAuthor)
  author.birthYear = parseInt(String(author.birthYear))
  await postAuthor(author)
  await router.push({ name: 'ListAuthors' })
}
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center>
      <IColumn md="8" lg="6">
        <h1 class="_color:primary _text-center _text-2xl">Nuevo Autor</h1>
        <AuthorForm
          :author="author"
          @save-author="saveAuthor"
          @cancel="router.push({ name: 'ListAuthors' })"
          class="_p-4 _rounded-md _border-b"
        ></AuthorForm>
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
