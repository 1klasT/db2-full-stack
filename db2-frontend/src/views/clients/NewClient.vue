<script setup lang="ts">
import { IColumn, IContainer, IRow } from '@inkline/inkline'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import { postClient } from '@/api'
import { Client } from '@/interfaces.ts'

import ClientForm from '@/components/forms/ClientForm.vue'

const router = useRouter()
const client: Client = reactive({
  name: '',
  email: ''
})

const saveClient = async (updatedClient: Client) => {
  Object.assign(client, updatedClient)
  await postClient(client)
  await router.push({ name: 'ListClients' })
}
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center>
      <IColumn md="8" lg="6">
        <h1 class="_color:primary _text-center _text-2xl">Nuevo Cliente</h1>
        <ClientForm
          :client="client"
          @save-client="saveClient"
          @cancel="router.push({ name: 'ListClients' })"
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