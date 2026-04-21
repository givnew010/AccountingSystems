import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const SalesReturnStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  number: { type: String, default: '' },
  date: { type: String, default: new Date().toISOString().split('T')[0] },
  customerId: { type: [Number, String], default: '' },
  customer: { type: Object, default: null },
  originalInvoiceNo: { type: String, default: '' },
  returnReason: { type: String, default: '' },
  notes: { type: String, default: '' },
  items: { type: Array, default: [] },
  total: { type: Number, default: 0 },
  status: { type: String, default: 'draft' }
}

export const useSalesReturnStore = defineStore('salesReturn', () => {
  const customers = ref([
    { id: 1, name: 'أحمد محمد' },
    { id: 2, name: 'فاطمة علي' },
    { id: 3, name: 'محمد أحمد' }
  ])

  const products = ref([
    { id: 1, name: 'منتج 1', price: 10.0 },
    { id: 2, name: 'منتج 2', price: 25.5 },
    { id: 3, name: 'منتج 3', price: 15.75 }
  ])

  const invoices = ref<any[]>([
    {
      id: 1,
      no: 1,
      number: 'RTN-001',
      date: '2024-01-16',
      customerId: 1,
      customer: { name: 'أحمد محمد' },
      originalInvoiceNo: 'INV-001',
      returnReason: 'defective',
      notes: '',
      items: [{ productId: 1, unit: 'piece', quantity: 1, price: 10.0, total: 10.0 }],
      total: 10.0,
      status: 'draft'
    }
  ])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currentData = ref<any>({ ...getDefaultValues(SalesReturnStructure), items: [] })

  const invoicesForList = computed(() =>
    invoices.value.map(inv => ({
      ...inv,
      name: `${inv.number} - ${inv.customer?.name || ''}`,
      no: inv.id
    }))
  )

  const invoiceTotal = computed(() => (currentData.value.items || []).reduce((sum: number, item: any) => sum + (item.total || 0), 0))

  function getStatusLabel(status: string) {
    const labels: Record<string, string> = { draft: 'مسودة', posted: 'مُرحّل', paid: 'مكتمل' }
    return labels[status] || status
  }

  function selectItem(id: number | null) {
    const invoice = invoices.value.find(inv => inv.id === id) ?? ({ ...getDefaultValues(SalesReturnStructure), items: [] } as any)
    selectedItemId.value = invoice.id ?? null
    currentData.value = { ...invoice, items: invoice.items ? invoice.items.map((i: any) => ({ ...i })) : [] }
  }

  function newInvoice() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    const nextNumber = `RTN-${String(invoices.value.length + 1).padStart(3, '0')}`
    selectedItemId.value = null
    currentData.value = { ...getDefaultValues(SalesReturnStructure), number: nextNumber, items: [] }
  }

  function editInvoice() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveInvoice(): { type: 'created' | 'updated'; id: number } {
    const customer = customers.value.find(c => c.id == currentData.value.customerId) ?? null
    const total = invoiceTotal.value

    if (selectedItemId.value) {
      const index = invoices.value.findIndex(inv => inv.id === selectedItemId.value)
      if (index > -1) {
        invoices.value[index] = { ...currentData.value, id: selectedItemId.value, customer, total }
        isViewMode.value = true
        selectItem(invoices.value[index].id)
        return { type: 'updated', id: invoices.value[index].id }
      }
    }

    const newId = Math.max(...invoices.value.map(inv => inv.id), 0) + 1
    const created = { ...currentData.value, id: newId, no: newId, customer, total }
    invoices.value.push(created)
    isViewMode.value = true
    selectItem(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelEdit() {
    isViewMode.value = true
    selectItem(lastSelectedItemId.value)
  }

  function confirmDeleteSelected(): boolean {
    if (!selectedItemId.value) return false
    const index = invoices.value.findIndex(inv => inv.id === currentData.value?.id)
    if (index <= -1) return false
    invoices.value.splice(index, 1)
    selectItem(invoices.value[index]?.id ?? invoices.value[index - 1]?.id ?? null)
    return true
  }

  function postInvoice(): boolean {
    if (!selectedItemId.value || currentData.value.status === 'posted') return false
    const index = invoices.value.findIndex(inv => inv.id === selectedItemId.value)
    if (index <= -1) return false
    invoices.value[index].status = 'posted'
    currentData.value.status = 'posted'
    return true
  }

  function addItem() {
    if (!currentData.value.items) currentData.value.items = []
    currentData.value.items.push({ productId: '', unit: 'piece', quantity: 1, price: 0, total: 0 })
  }

  function removeItem(index: number) {
    currentData.value.items.splice(index, 1)
  }

  function updateProduct(index: number) {
    const item = currentData.value.items[index]
    const product = products.value.find(p => p.id == item.productId)
    if (product) {
      item.price = product.price
      calcTotal(index)
    }
  }

  function calcTotal(index: number) {
    const item = currentData.value.items[index]
    item.total = Math.max(0, (item.quantity || 0) * (item.price || 0))
  }

  function init() {
    isViewMode.value = true
    selectItem(invoices.value[0]?.id ?? (-1 as any))
  }

  return {
    customers,
    products,
    invoices,
    selectedItemId,
    lastSelectedItemId,
    isViewMode,
    currentData,
    invoicesForList,
    invoiceTotal,
    getStatusLabel,
    selectItem,
    newInvoice,
    editInvoice,
    saveInvoice,
    cancelEdit,
    confirmDeleteSelected,
    postInvoice,
    addItem,
    removeItem,
    updateProduct,
    calcTotal,
    init
  }
})

