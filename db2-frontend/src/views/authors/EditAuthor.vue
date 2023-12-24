<script setup lang="ts">
import { IColumn, IContainer, IRow } from '@inkline/inkline'
import { Ref, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getAuthor, getAuthors, updateAuthor } from '@/api'
import { Author, Book } from '@/interfaces.ts'

import AuthorForm from '@/components/forms/AuthorForm.vue'

const route = useRoute()
const router = useRouter()
const author: Ref<Author | null> = ref(null)

const loadAuthor = async () => {
  author.value = await getAuthor(route.params.id as string)
}

const saveAuthor = async (author: Author) => {
  await updateAuthor(author)
  await router.push({ name: 'ViewAuthor', params: { id: author.id } })
}

loadAuthor()
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center>
      <IColumn md="8" lg="6">
        <h1 class="_color:primary _text-center _text-2xl">Editar {{ author?.name }}</h1>
        <AuthorForm
          :input-author="author"
          @save-author="saveAuthor"
          @cancel="router.push({ name: 'ViewAuthor', params: { id: author?.id } })"
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


<style scoped></style>
