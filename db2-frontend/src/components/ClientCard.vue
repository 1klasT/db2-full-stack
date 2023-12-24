<script setup lang="ts">
import { IButton, ICard } from '@inkline/inkline'

import { Client } from '@/interfaces.ts' // Assuming you have a Client interface

defineProps<{
  client: Client
}>()
</script>

<template>
  <ICard>
    <div class="_display:flex">
      <div class="_flex-grow:1">
        <h2 class="_color:primary!">
          {{ client.name }}
        </h2>
      </div>
      <div>
        <ILink :href="'/clients/' + client.id">
          <IButton outline color="primary">
            <FontAwesomeIcon icon="user" class="_margin-right:1/2" />
            Detalles
          </IButton>
        </ILink>
      </div>
    </div>
    <div class="_text-align:right">
      Email: {{ client.email }}
    </div>
  </ICard>
</template>

<style scoped>
.no-wrap {
  flex-shrink: 0;
}
</style>
