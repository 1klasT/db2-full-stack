<script setup lang="ts">
import { IButton, IColumn, IContainer, IIcon, ILoader, IRow } from '@inkline/inkline'
import { reactive, ref } from 'vue'

import { getClients } from '@/api'
import { Client } from '@/interfaces.ts'

import ClientCard from '@/components/ClientCard.vue'

const clients: Client[] = reactive([])
const loading = ref(false)

const loadClients = async () => {
  loading.value = true
  Object.assign(clients, await getClients())
  loading.value = false
}

loadClients()
</script>

<template>
  <IContainer class="_bg-gray-100 _p-4">
    <IRow justify-center class="_margin-bottom:4">
      <IColumn xs="12">
        <IButton color="primary">
          <template #icon>
            <IIcon name="ink-plus" />
          </template>
          Nuevo cliente
        </IButton>
      </IColumn>
    </IRow>
    <IRow class="_justify-center">
      <div v-if="loading" class="_margin-y:4">
        <ILoader />
      </div>
      <template v-else>
        <IColumn v-for="client in clients" :key="client.id" md="4" class="_margin-bottom:2">
          <ClientCard :client="client" class="_bg-gray-200 _rounded-md _shadow-md" />
        </IColumn>
      </template>
    </IRow>
  </IContainer>
</template>
