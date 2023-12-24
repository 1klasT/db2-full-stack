<script setup lang="ts">
import { IColumn, IContainer, IRow } from '@inkline/inkline'
import { Ref, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getClient, updateClient } from '@/api'
import { Client } from '@/interfaces.ts'

import ClientForm from '@/components/forms/ClientForm.vue'

const route = useRoute()
const router = useRouter()
const client: Ref<Client | null> = ref(null)

const loadClient = async () => {
  client.value = await getClient(route.params.id as string)
}

const saveClient = async (client: Client) => {
  await updateClient(client)
  await router.push({ name: 'ViewClient', params: { id: client.id } })
}

loadClient()
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center>
      <IColumn md="8" lg="6">
        <h1 class="_color:primary _text-center _text-2xl">Editar {{ client?.name }}</h1>
        <ClientForm
          :input-client="client"
          @save-client="saveClient"
          @cancel="router.push({ name: 'ViewClient', params: { id: client?.id } })"
          class="_p-4 _rounded-md _border-b"
        ></ClientForm>
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
