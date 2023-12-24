<script setup lang="ts">
import {
  IButton,
  IButtonGroup,
  IForm,
  IFormGroup,
  IFormLabel,
  IInput,
  ITextarea
} from '@inkline/inkline'
import { Ref, computed, reactive, ref, watch } from 'vue'

import { Category } from '@/interfaces'

interface Props {
  inputCategory?: Category | null
}

const props = withDefaults(defineProps<Props>(), {
  inputCategory: null
})

const emit = defineEmits<{
  saveCategory: [category: Category]
  cancel: []
}>()

const category: Category = reactive({
  name: '',
})

watch(
  () => props.inputCategory,
  () => {
    if (props.inputCategory !== null) {
      Object.assign(category, props.inputCategory)
    }
  }
)

const saveCategory = () => {
  emit('saveCategory', category)
}
</script>

<template>
    <IForm>
      <IFormGroup>
        <IFormLabel>Nombre</IFormLabel>
        <IInput v-model="category.name"></IInput>
      </IFormGroup>
      <IFormGroup class="_margin-top:3!">
        <IButtonGroup block>
          <IButton color="primary" @click="saveCategory">Guardar</IButton>
          <IButton color="gray" @click="emit('cancel')">Cancelar</IButton>
        </IButtonGroup>
      </IFormGroup>
    </IForm>
  </template>

<style scoped></style>
