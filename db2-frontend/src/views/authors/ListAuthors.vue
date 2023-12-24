<script setup lang="ts">
import { IButton, IColumn, IContainer, IIcon, ILoader, IRow } from '@inkline/inkline'
import { reactive, ref } from 'vue'

import { getAuthors } from '@/api'
import { Author } from '@/interfaces.ts'

import AuthorCard from '@/components/AuthorCard.vue'

const authors: Author[] = reactive([])
const loading = ref(false)

const loadAuthors = async () => {
  loading.value = true
  Object.assign(authors, await getAuthors())
  loading.value = false
}

loadAuthors()
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center class="_margin-bottom:4">
      <IColumn xs="12">
        <IButton color="primary">
          <template #icon>
            <IIcon name="ink-plus" />
          </template>
          Nuevo autor
        </IButton>
      </IColumn>
    </IRow>
    <IRow class="_justify-center">
      <div v-if="loading" class="_margin-y:4">
        <ILoader />
      </div>
      <template v-else>
        <IColumn v-for="author in authors" :key="author.id" md="4" class="_margin-bottom:2 _rounded-md _shadow-md">
          <AuthorCard :author="author" class="_bg-gray-200" />
        </IColumn>
      </template>
    </IRow>
  </IContainer>
</template>

