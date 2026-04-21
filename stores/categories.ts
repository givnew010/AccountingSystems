import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const CategoryStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, default: 'active' },
  productCount: { type: Number, default: 0 }
}

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref([
    {
      id: 1,
      no: 1,
      name: 'أجهزة كمبيوتر',
      description: 'أجهزة الكمبيوتر واللابتوب والملحقات',
      status: 'active',
      productCount: 15
    },
    {
      id: 2,
      no: 2,
      name: 'ملحقات',
      description: 'ملحقات الكمبيوتر والأجهزة المكتبية',
      status: 'active',
      productCount: 8
    },
    {
      id: 3,
      no: 3,
      name: 'أثاث مكتبي',
      description: 'الأثاث والمعدات المكتبية',
      status: 'active',
      productCount: 5
    },
    {
      id: 4,
      no: 4,
      name: 'أجهزة إلكترونية',
      description: 'الأجهزة الإلكترونية والجوالات',
      status: 'inactive',
      productCount: 0
    }
  ])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currentData = ref<any>({ ...getDefaultValues(CategoryStructure) })

  function selectItem(id: number | null) {
    const category = categories.value.find(c => c.id === id) ?? ({ ...getDefaultValues(CategoryStructure) } as any)
    selectedItemId.value = category.id ?? null
    currentData.value = { ...category }
  }

  function newCategory() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    selectItem(-1 as any)
  }

  function editCategory() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveCategory(): { type: 'created' | 'updated'; id: number } {
    if (selectedItemId.value) {
      const index = categories.value.findIndex(c => c.id === selectedItemId.value)
      if (index > -1) {
        categories.value[index] = { ...currentData.value, id: selectedItemId.value }
        isViewMode.value = true
        selectItem(categories.value[index].id)
        return { type: 'updated', id: categories.value[index].id }
      }
    }

    const newId = Math.max(...categories.value.map(c => c.id), 0) + 1
    const created = { ...currentData.value, id: newId, no: newId, productCount: 0 }
    categories.value.push(created)
    isViewMode.value = true
    selectItem(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelEdit() {
    isViewMode.value = true
    selectItem(lastSelectedItemId.value)
  }

  function confirmDeleteSelected(): boolean {
    const index = categories.value.findIndex(c => c.id === currentData.value?.id)
    if (index <= -1) return false
    categories.value.splice(index, 1)
    const nextId =
      (index >= 0 && index < categories.value.length ? categories.value[index].id : null) ??
      (index === categories.value.length ? categories.value[index - 1]?.id : null) ??
      null
    selectItem(nextId)
    return true
  }

  function init() {
    isViewMode.value = true
    selectItem(categories.value[0]?.id ?? (-1 as any))
  }

  return {
    categories,
    selectedItemId,
    lastSelectedItemId,
    isViewMode,
    currentData,
    selectItem,
    newCategory,
    editCategory,
    saveCategory,
    cancelEdit,
    confirmDeleteSelected,
    init
  }
})

