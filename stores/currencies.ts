import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const CurrencyStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  code: { type: String, default: '' },
  symbol: { type: String, default: '' },
  exchangeRate: { type: Number, default: 1.0 },
  status: { type: String, default: 'active' }
}

export const useCurrenciesStore = defineStore('currencies', () => {
  const currencies = ref([
    { id: 1, no: 1, name: 'الريال السعودي', code: 'SAR', symbol: 'ر.س', exchangeRate: 1.0, status: 'active' },
    { id: 2, no: 2, name: 'الدولار الأمريكي', code: 'USD', symbol: '$', exchangeRate: 3.75, status: 'active' },
    { id: 3, no: 3, name: 'اليورو', code: 'EUR', symbol: '€', exchangeRate: 4.1, status: 'active' },
    { id: 4, no: 4, name: 'الجنيه الإسترليني', code: 'GBP', symbol: '£', exchangeRate: 4.8, status: 'inactive' }
  ])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currencyForm = ref<any>({ ...getDefaultValues(CurrencyStructure) })

  function selectCurrencyById(id: number | null) {
    const cur = currencies.value.find(c => c.id === id) ?? ({ ...getDefaultValues(CurrencyStructure) } as any)
    selectedItemId.value = cur.id ?? null
    currencyForm.value = { ...cur }
  }

  function newCurrency() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    selectCurrencyById(-1 as any)
  }

  function editCurrency() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveCurrency(): { type: 'created' | 'updated'; id: number } {
    if (selectedItemId.value) {
      const idx = currencies.value.findIndex(c => c.id === selectedItemId.value)
      if (idx > -1) {
        currencies.value[idx] = { ...currencyForm.value, id: selectedItemId.value }
        isViewMode.value = true
        selectCurrencyById(currencies.value[idx].id)
        return { type: 'updated', id: currencies.value[idx].id }
      }
    }

    const newId = Math.max(...currencies.value.map(c => c.id), 0) + 1
    const created = { ...currencyForm.value, id: newId, no: newId }
    currencies.value.push(created)
    isViewMode.value = true
    selectCurrencyById(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelNewOrEdit() {
    isViewMode.value = true
    selectCurrencyById(lastSelectedItemId.value)
  }

  function confirmDeleteSelected(): boolean {
    const id = selectedItemId.value
    const idx = currencies.value.findIndex(c => c.id === id)
    if (idx <= -1) return false
    currencies.value.splice(idx, 1)
    const nextId = currencies.value[idx]?.id ?? currencies.value[idx - 1]?.id ?? null
    selectCurrencyById(nextId)
    return true
  }

  function init() {
    isViewMode.value = true
    selectCurrencyById(currencies.value[0]?.id ?? (-1 as any))
  }

  return {
    currencies,
    selectedItemId,
    lastSelectedItemId,
    isViewMode,
    currencyForm,
    selectCurrencyById,
    newCurrency,
    editCurrency,
    saveCurrency,
    cancelNewOrEdit,
    confirmDeleteSelected,
    init
  }
})

