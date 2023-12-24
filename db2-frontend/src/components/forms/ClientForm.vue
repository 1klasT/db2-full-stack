<script setup lang="ts">
import {
  IButton,
  IButtonGroup,
  IForm,
  IFormGroup,
  IFormLabel,
  IInput
} from '@inkline/inkline'
import { reactive, watch } from 'vue'

import { Client } from '@/interfaces' // Assuming you have a Client interface

interface Props {
  inputClient?: Client | null
}

const props = withDefaults(defineProps<Props>(), {
  inputClient: null
})

const emit = defineEmits<{
  saveClient: [client: Client]
  cancel: []
}>()

const client: Client = reactive({
  name: '',
  email: ''
})

watch(
  () => props.inputClient,
  () => {
    if (props.inputClient !== null) {
      Object.assign(client, props.inputClient)
    }
  }
)

const saveClient = () => {
  emit('saveClient', client)
}
</script>

<template>
  <IForm>
    <IFormGroup>
      <IFormLabel>Nombre</IFormLabel>
      <IInput v-model="client.name"></IInput>
    </IFormGroup>
    <IFormGroup>
      <IFormLabel>Email</IFormLabel>
      <IInput v-model="client.email"></IInput>
    </IFormGroup>
    <IFormGroup class="_margin-top:3!">
      <IButtonGroup block>
        <IButton color="primary" @click="saveClient">Guardar</IButton>
        <IButton color="gray" @click="emit('cancel')">Cancelar</IButton>
      </IButtonGroup>
    </IFormGroup>
  </IForm>
</template>

<style scoped></style>
