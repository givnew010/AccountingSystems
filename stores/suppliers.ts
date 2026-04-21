import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const SupplierStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  address: { type: String, default: '' },
  openingBalance: { type: Number, default: 0 },
  balanceType: { type: String, default: 'credit' },
  paymentTerms: { type: String, default: '30days' },
  status: { type: String, default: 'active' }
}

export const useSuppliersStore = defineStore('suppliers', () => {
  const suppliers = ref([
    {
      id: 1,
      no: 1,
      name: 'شركة الأدوات المكتبية',
      phone: '0112345678',
      email: 'office@tools-sa.com',
      address: 'الرياض، المملكة العربية السعودية',
      openingBalance: 2500,
      balanceType: 'credit',
      paymentTerms: '30days',
      status: 'active'
    },
    {
      id: 2,
      no: 2,
      name: 'مؤسسة الإلكترونيات المتقدمة',
      phone: '0123456789',
      email: 'sales@electronics-sa.com',
      address: 'جدة، المملكة العربية السعودية',
      openingBalance: 1500,
      balanceType: 'debit',
      paymentTerms: '15days',
      status: 'active'
    },
    {
      id: 3,
      no: 3,
      name: 'شركة المواد الغذائية',
      phone: '0134567890',
      email: 'info@food-supplies.com',
      address: 'الدمام، المملكة العربية السعودية',
      openingBalance: 0,
      balanceType: 'debit',
      paymentTerms: '7days',
      status: 'inactive'
    }
  ])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currentData = ref<any>({ ...getDefaultValues(SupplierStructure) })

  function selectItem(id: number | null) {
    const supplier = suppliers.value.find(s => s.id === id) ?? ({ ...getDefaultValues(SupplierStructure) } as any)
    selectedItemId.value = supplier.id ?? null
    currentData.value = { ...supplier }
  }

  function newSupplier() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    selectItem(-1 as any)
  }

  function editSupplier() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveSupplier(): { type: 'created' | 'updated'; id: number } {
    if (selectedItemId.value) {
      const index = suppliers.value.findIndex(s => s.id === selectedItemId.value)
      if (index > -1) {
        suppliers.value[index] = { ...currentData.value, id: selectedItemId.value }
        isViewMode.value = true
        selectItem(suppliers.value[index].id)
        return { type: 'updated', id: suppliers.value[index].id }
      }
    }

    const newId = Math.max(...suppliers.value.map(s => s.id), 0) + 1
    const created = { ...currentData.value, id: newId, no: newId }
    suppliers.value.push(created)
    isViewMode.value = true
    selectItem(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelNewOrEdit() {
    isViewMode.value = true
    selectItem(lastSelectedItemId.value)
  }

  function confirmDeleteSelected(): boolean {
    const index = suppliers.value.findIndex(s => s.id === currentData.value?.id)
    if (index <= -1) return false
    suppliers.value.splice(index, 1)
    const nextId =
      (index >= 0 && index < suppliers.value.length ? suppliers.value[index].id : null) ??
      (index === suppliers.value.length ? suppliers.value[index - 1]?.id : null) ??
      null
    selectItem(nextId)
    return true
  }

  function init() {
    isViewMode.value = true
    selectItem(suppliers.value[0]?.id ?? (-1 as any))
  }

  return {
    suppliers,
    selectedItemId,
    lastSelectedItemId,
    isViewMode,
    currentData,
    selectItem,
    newSupplier,
    editSupplier,
    saveSupplier,
    cancelNewOrEdit,
    confirmDeleteSelected,
    init
  }
})

