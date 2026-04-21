import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const WarehouseStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  branchId: { type: [Number, String], default: '' },
  branchName: { type: String, default: '' },
  location: { type: String, default: '' },
  capacity: { type: Number, default: null },
  status: { type: String, default: 'active' },
  productsCount: { type: Number, default: 0 }
}

export const useWarehousesStore = defineStore('warehouses', () => {
  // lookups (mock)
  const branches = ref([
    {
      id: 1,
      no: 1,
      name: 'المقر الرئيسي',
      address: 'الرياض، المملكة العربية السعودية',
      phone: '+966112345678',
      email: 'main@company.com',
      status: 'active',
      warehousesCount: 3
    },
    {
      id: 2,
      no: 2,
      name: 'فرع جدة',
      address: 'جدة، المملكة العربية السعودية',
      phone: '+966212345678',
      email: 'jeddah@company.com',
      status: 'active',
      warehousesCount: 2
    },
    {
      id: 3,
      no: 3,
      name: 'فرع الدمام',
      address: 'الدمام، المملكة العربية السعودية',
      phone: '+966312345678',
      email: 'dammam@company.com',
      status: 'inactive',
      warehousesCount: 0
    }
  ])

  // entities (mock)
  const warehouses = ref([
    {
      id: 1,
      no: 1,
      name: 'المستودع الرئيسي',
      branchId: 1,
      branchName: 'المقر الرئيسي',
      location: 'المنطقة الصناعية',
      capacity: 1000,
      status: 'active',
      productsCount: 150
    },
    {
      id: 2,
      no: 2,
      name: 'مستودع الإلكترونيات',
      branchId: 1,
      branchName: 'المقر الرئيسي',
      location: 'المبنى B',
      capacity: 500,
      status: 'active',
      productsCount: 75
    },
    {
      id: 3,
      no: 3,
      name: 'مستودع الأثاث',
      branchId: 1,
      branchName: 'المقر الرئيسي',
      location: 'المستودع الخارجي',
      capacity: 800,
      status: 'active',
      productsCount: 45
    },
    {
      id: 4,
      no: 4,
      name: 'مستودع جدة الرئيسي',
      branchId: 2,
      branchName: 'فرع جدة',
      location: 'المنطقة الصناعية',
      capacity: 600,
      status: 'active',
      productsCount: 90
    },
    {
      id: 5,
      no: 5,
      name: 'مستودع جدة الفرعي',
      branchId: 2,
      branchName: 'فرع جدة',
      location: 'وسط المدينة',
      capacity: 300,
      status: 'inactive',
      productsCount: 0
    }
  ])

  // ui state
  const warehouseSelectedId = ref<number | null>(null)
  const warehouseLastSelectedId = ref<number | null>(null)
  const warehouseViewMode = ref(true)
  const warehouseData = ref<any>({ ...getDefaultValues(WarehouseStructure) })

  function selectWarehouse(id: number | null) {
    const wh = warehouses.value.find(w => w.id === id) ?? ({ ...getDefaultValues(WarehouseStructure) } as any)
    warehouseSelectedId.value = wh.id ?? null
    warehouseData.value = { ...wh }
  }

  function newWarehouse() {
    warehouseViewMode.value = false
    warehouseLastSelectedId.value = warehouseSelectedId.value
    selectWarehouse(-1 as any)
  }

  function editWarehouse() {
    if (warehouseSelectedId.value) {
      warehouseViewMode.value = false
      warehouseLastSelectedId.value = warehouseSelectedId.value
    }
  }

  function saveWarehouse(): { type: 'created' | 'updated'; id: number } {
    if (warehouseSelectedId.value) {
      const index = warehouses.value.findIndex(w => w.id === warehouseSelectedId.value)
      if (index > -1) {
        const branch = branches.value.find(b => b.id === warehouseData.value.branchId)
        warehouses.value[index] = {
          ...warehouseData.value,
          id: warehouseSelectedId.value,
          branchName: branch?.name || ''
        }
        warehouseViewMode.value = true
        selectWarehouse(warehouses.value[index].id)
        return { type: 'updated', id: warehouses.value[index].id }
      }
    }

    const newId = Math.max(...warehouses.value.map(w => w.id), 0) + 1
    const branch = branches.value.find(b => b.id === warehouseData.value.branchId)
    const created = {
      ...warehouseData.value,
      id: newId,
      no: newId,
      branchName: branch?.name || '',
      productsCount: 0
    }
    warehouses.value.push(created)
    warehouseViewMode.value = true
    selectWarehouse(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelWarehouseEdit() {
    warehouseViewMode.value = true
    selectWarehouse(warehouseLastSelectedId.value)
  }

  function confirmDeleteSelected(): boolean {
    const index = warehouses.value.findIndex(w => w.id === warehouseData.value?.id)
    if (index <= -1) return false
    warehouses.value.splice(index, 1)
    selectWarehouse(warehouses.value[index]?.id ?? warehouses.value[index - 1]?.id ?? null)
    return true
  }

  function init() {
    warehouseViewMode.value = true
    selectWarehouse(warehouses.value[0]?.id ?? (-1 as any))
  }

  return {
    branches,
    warehouses,
    warehouseSelectedId,
    warehouseLastSelectedId,
    warehouseViewMode,
    warehouseData,
    selectWarehouse,
    newWarehouse,
    editWarehouse,
    saveWarehouse,
    cancelWarehouseEdit,
    confirmDeleteSelected,
    init
  }
})

