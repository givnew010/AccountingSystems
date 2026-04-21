import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const PurchaseInvoiceStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  number: { type: String, default: '' },
  date: { type: String, default: new Date().toISOString().split('T')[0] },
  supplierId: { type: [Number, String], default: '' },
  supplier: { type: Object, default: null },
  paymentMethod: { type: String, default: 'cash' },
  supplierInvoiceNo: { type: String, default: '' },
  notes: { type: String, default: '' },
  items: { type: Array, default: [] },
  total: { type: Number, default: 0 },
  status: { type: String, default: 'draft' }
}

export const usePurchasesStore = defineStore('purchases', () => {
  const suppliers = ref([
    { id: 1, name: 'شركة الأمانة للتوريدات' },
    { id: 2, name: 'مؤسسة النور للإمداد' },
    { id: 3, name: 'شركة الخليج للتجارة' }
  ])

  const products = ref([
    { id: 1, name: 'منتج 1', costPrice: 8.0 },
    { id: 2, name: 'منتج 2', costPrice: 20.0 },
    { id: 3, name: 'منتج 3', costPrice: 12.0 }
  ])

  const invoices = ref<any[]>([
    {
      id: 1,
      no: 1,
      number: 'PUR-001',
      date: '2024-01-14',
      supplierId: 1,
      supplier: { name: 'شركة الأمانة للتوريدات' },
      paymentMethod: 'credit',
      supplierInvoiceNo: 'S-456',
      notes: '',
      items: [{ productId: 1, unit: 'piece', quantity: 10, price: 8.0, discount: 0, total: 80.0 }],
      total: 80.0,
      status: 'posted'
    }
  ])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currentData = ref<any>({ ...getDefaultValues(PurchaseInvoiceStructure), items: [] })

  const invoicesForList = computed(() =>
    invoices.value.map(inv => ({
      ...inv,
      name: `${inv.number} - ${inv.supplier?.name || ''}`,
      no: inv.id
    }))
  )

  const invoiceTotal = computed(() => (currentData.value.items || []).reduce((sum: number, item: any) => sum + (item.total || 0), 0))

  function getStatusLabel(status: string) {
    const labels: Record<string, string> = { draft: 'مسودة', posted: 'مُرحّلة', paid: 'مدفوعة' }
    return labels[status] || status
  }

  function selectItem(id: number | null) {
    const invoice = invoices.value.find(inv => inv.id === id) ?? ({ ...getDefaultValues(PurchaseInvoiceStructure), items: [] } as any)
    selectedItemId.value = invoice.id ?? null
    currentData.value = { ...invoice, items: invoice.items ? invoice.items.map((i: any) => ({ ...i })) : [] }
  }

  function newInvoice() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    const nextNumber = `PUR-${String(invoices.value.length + 1).padStart(3, '0')}`
    selectedItemId.value = null
    currentData.value = { ...getDefaultValues(PurchaseInvoiceStructure), number: nextNumber, items: [] }
  }

  function editInvoice() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveInvoice(): { type: 'created' | 'updated'; id: number } {
    const supplier = suppliers.value.find(s => s.id == currentData.value.supplierId) ?? null
    const total = invoiceTotal.value

    if (selectedItemId.value) {
      const index = invoices.value.findIndex(inv => inv.id === selectedItemId.value)
      if (index > -1) {
        invoices.value[index] = { ...currentData.value, id: selectedItemId.value, supplier, total }
        isViewMode.value = true
        selectItem(invoices.value[index].id)
        return { type: 'updated', id: invoices.value[index].id }
      }
    }

    const newId = Math.max(...invoices.value.map(inv => inv.id), 0) + 1
    const created = { ...currentData.value, id: newId, no: newId, supplier, total }
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
    currentData.value.items.push({ productId: '', unit: 'piece', quantity: 1, price: 0, discount: 0, total: 0 })
  }

  function removeItem(index: number) {
    currentData.value.items.splice(index, 1)
  }

  function updateProduct(index: number) {
    const item = currentData.value.items[index]
    const product = products.value.find(p => p.id == item.productId)
    if (product) {
      item.price = product.costPrice
      calcTotal(index)
    }
  }

  function calcTotal(index: number) {
    const item = currentData.value.items[index]
    item.total = Math.max(0, (item.quantity || 0) * (item.price || 0) - (item.discount || 0))
  }

  function init() {
    isViewMode.value = true
    selectItem(invoices.value[0]?.id ?? (-1 as any))
  }

  return {
    suppliers,
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

