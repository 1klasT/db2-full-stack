<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { IBadge, IButton, IColumn, IContainer, IRow, ITable } from '@inkline/inkline'
import { Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

import { getClient } from '@/api'
import { Client } from '@/interfaces.ts'

const route = useRoute()
const client: Ref<Client | null> = ref(null)

const loadClient = async () => {
  client.value = await getClient(route.params.id as string)
}

loadClient()
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow around>
      <IColumn md="4" lg="3">
        <h1 class="_color:primary _text-3xl">
          {{ client?.name }}
        </h1>
        <p class="_text-lg _color:text-dark-500">
          {{ client?.email }}
        </p>
      </IColumn>
      <IColumn md="8" lg="9">
        <IButton
          :to="{ name: 'EditClient', params: { id: client?.id } }"
          outline
          color="primary"
          class="_float:right!"
        >
          <FontAwesomeIcon icon="edit" class="_margin-right:1/4"></FontAwesomeIcon>
          Modificar
        </IButton>
      </IColumn>
    </IRow>
    <IRow around>
      <IColumn md="10" lg="8">
        </IColumn>
    </IRow>
  </IContainer>
</template>

<style scoped></style>
