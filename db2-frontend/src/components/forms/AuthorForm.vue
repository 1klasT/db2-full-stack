<script setup lang="ts">
import {
  IButton,
  IButtonGroup,
  IForm,
  IFormGroup,
  IFormLabel,
  IInput,
  INumberInput,
  ITextarea
} from '@inkline/inkline'
import { Ref, computed, reactive, ref, watch } from 'vue'

import { Author, Category } from '@/interfaces'

interface Props {
  inputAuthor?: Author | null
  categories: Category[]
}

const props = withDefaults(defineProps<Props>(), {
  inputAuthor: null
})

const emit = defineEmits<{
  saveAuthor: [author: Author]
  cancel: []
}>()

const author: Author = reactive({
  name: '',
  bibliography: '',
  dateOfBirth: null,
})
const selectedCategories: Ref<number[]> = ref([])

const categoryOptions = computed(() => {
  return props.categories.map((x) => ({ id: x.id, label: x.name }))
})

watch(
  () => props.inputAuthor,
  () => {
    if (props.inputAuthor !== null) {
      Object.assign(author, props.inputAuthor)
      selectedCategories.value = props.inputAuthor.categories.map((x) => x.id as number)
    }
  }
)

const saveAuthor = () => {
  author.categories = props.categories
    .filter((x) => selectedCategories.value.includes(x.id as number))
    .map((x) => ({ id: x.id }))

  emit('saveAuthor', author)
}
</script>

<template>
    <IForm>
      <IFormGroup>
        <IFormLabel>Nombre</IFormLabel>
        <IInput v-model="author.name"></IInput>
      </IFormGroup>
      <IFormGroup>
        <IFormLabel>Biografía</IFormLabel>
        <ITextarea v-model="author.bibliography"></ITextarea>
      </IFormGroup>
      <IFormGroup>
        <IFormLabel>Año de nacimiento</IFormLabel>
        <INumberInput v-model="author.dateOfBirth"></INumberInput>
      </IFormGroup>
      <IFormGroup class="_margin-top:3!">
        <IButtonGroup block>
          <IButton color="primary" @click="saveAuthor">Guardar</IButton>
          <IButton color="gray" @click="emit('cancel')">Cancelar</IButton>
        </IButtonGroup>
      </IFormGroup>
    </IForm>
  </template>

<style scoped></style>
