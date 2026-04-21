import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const CustomerStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  openingBalance: { type: Number, default: 0 },
  balanceType: { type: String, default: 'debit' },
  status: { type: String, default: 'active' }
}

export const useCustomersStore = defineStore('customers', () => {
  const customers = ref([
    {
      id: 1,
      no: 1,
      name: 'أحمد محمد',
      phone: '0501234567',
      address: 'الرياض، المملكة العربية السعودية',
      openingBalance: 1000,
      balanceType: 'debit',
      status: 'active'
    },
    {
      id: 2,
      no: 2,
      name: 'فاطمة علي',
      phone: '0507654321',
      address: 'جدة، المملكة العربية السعودية',
      openingBalance: 500,
      balanceType: 'credit',
      status: 'active'
    },
    {
      id: 3,
      no: 3,
      name: 'محمد أحمد',
      phone: '0509876543',
      address: 'الدمام، المملكة العربية السعودية',
      openingBalance: 0,
      balanceType: 'debit',
      status: 'inactive'
    }
  ])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currentData = ref<any>({ ...getDefaultValues(CustomerStructure) })

  function selectItem(id: number | null) {
    const customer = customers.value.find(c => c.id === id) ?? ({ ...getDefaultValues(CustomerStructure) } as any)
    selectedItemId.value = customer.id ?? null
    currentData.value = { ...customer }
  }

  function newCustomer() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    selectItem(-1 as any)
  }

  function editCustomer() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveCustomer(): { type: 'created' | 'updated'; id: number } {
    if (selectedItemId.value) {
      const index = customers.value.findIndex(c => c.id === selectedItemId.value)
      if (index > -1) {
        customers.value[index] = { ...currentData.value, id: selectedItemId.value }
        isViewMode.value = true
        selectItem(customers.value[index].id)
        return { type: 'updated', id: customers.value[index].id }
      }
    }

    const newId = Math.max(...customers.value.map(c => c.id), 0) + 1
    const created = { ...currentData.value, id: newId, no: newId }
    customers.value.push(created)
    isViewMode.value = true
    selectItem(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelNewOrEdit() {
    isViewMode.value = true
    selectItem(lastSelectedItemId.value)
  }

  function confirmDeleteSelected(): boolean {
    const index = customers.value.findIndex(c => c.id === currentData.value?.id)
    if (index <= -1) return false
    customers.value.splice(index, 1)
    const nextId =
      (index >= 0 && index < customers.value.length ? customers.value[index].id : null) ??
      (index === customers.value.length ? customers.value[index - 1]?.id : null) ??
      null
    selectItem(nextId)
    return true
  }

  function init() {
    isViewMode.value = true
    selectItem(customers.value[0]?.id ?? (-1 as any))
  }

  return {
    customers,
    selectedItemId,
    lastSelectedItemId,
    isViewMode,
    currentData,
    selectItem,
    newCustomer,
    editCustomer,
    saveCustomer,
    cancelNewOrEdit,
    confirmDeleteSelected,
    init
  }
})

