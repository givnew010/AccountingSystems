import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const UnitStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  symbol: { type: String, default: '' },
  type: { type: String, default: 'count' },
  description: { type: String, default: '' },
  status: { type: String, default: 'active' },
  usageCount: { type: Number, default: 0 }
}

export const useUnitsStore = defineStore('units', () => {
  const units = ref([
    {
      id: 1,
      no: 1,
      name: 'قطعة',
      symbol: 'قطعة',
      type: 'count',
      description: 'وحدة العد للأشياء القابلة للعد',
      status: 'active',
      usageCount: 25
    },
    {
      id: 2,
      no: 2,
      name: 'كيلو جرام',
      symbol: 'كجم',
      type: 'weight',
      description: 'وحدة قياس الوزن',
      status: 'active',
      usageCount: 15
    },
    {
      id: 3,
      no: 3,
      name: 'لتر',
      symbol: 'لتر',
      type: 'volume',
      description: 'وحدة قياس الحجم للسوائل',
      status: 'active',
      usageCount: 8
    },
    {
      id: 4,
      no: 4,
      name: 'متر مربع',
      symbol: 'م²',
      type: 'area',
      description: 'وحدة قياس المساحة',
      status: 'active',
      usageCount: 3
    },
    {
      id: 5,
      no: 5,
      name: 'علبة',
      symbol: 'علبة',
      type: 'count',
      description: 'وحدة العد للعلب والحزم',
      status: 'inactive',
      usageCount: 0
    }
  ])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const unitForm = ref<any>({ ...getDefaultValues(UnitStructure) })

  function selectUnitById(id: number | null) {
    const unit = units.value.find(u => u.id === id) ?? ({ ...getDefaultValues(UnitStructure) } as any)
    selectedItemId.value = unit.id ?? null
    unitForm.value = { ...unit }
  }

  function newUnit() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    selectUnitById(-1 as any)
  }

  function editUnit() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveUnit(): { type: 'created' | 'updated'; id: number } {
    if (selectedItemId.value) {
      const index = units.value.findIndex(u => u.id === selectedItemId.value)
      if (index > -1) {
        units.value[index] = { ...unitForm.value, id: selectedItemId.value }
        isViewMode.value = true
        selectUnitById(units.value[index].id)
        return { type: 'updated', id: units.value[index].id }
      }
    }

    const newId = Math.max(...units.value.map(u => u.id), 0) + 1
    const created = { ...unitForm.value, id: newId, no: newId, usageCount: 0 }
    units.value.push(created)
    isViewMode.value = true
    selectUnitById(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelEdit() {
    isViewMode.value = true
    selectUnitById(lastSelectedItemId.value)
  }

  function confirmDeleteSelected(): boolean {
    const id = unitForm.value?.id
    const index = units.value.findIndex(u => u.id === id)
    if (index <= -1) return false
    units.value.splice(index, 1)
    const nextId = units.value[index]?.id ?? units.value[index - 1]?.id ?? null
    selectUnitById(nextId)
    return true
  }

  function init() {
    isViewMode.value = true
    selectUnitById(units.value[0]?.id ?? (-1 as any))
  }

  return {
    units,
    selectedItemId,
    lastSelectedItemId,
    isViewMode,
    unitForm,
    selectUnitById,
    newUnit,
    editUnit,
    saveUnit,
    cancelEdit,
    confirmDeleteSelected,
    init
  }
})

