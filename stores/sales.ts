import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const SalesInvoiceStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  number: { type: String, default: '' },
  date: { type: String, default: new Date().toISOString().split('T')[0] },
  customerId: { type: [Number, String], default: '' },
  customer: { type: Object, default: null },
  paymentMethod: { type: String, default: 'cash' },
  notes: { type: String, default: '' },
  items: { type: Array, default: [] },
  total: { type: Number, default: 0 },
  status: { type: String, default: 'draft' }
}

export const useSalesStore = defineStore('sales', () => {
  const customers = ref([
    { id: 1, name: 'أحمد محمد' },
    { id: 2, name: 'فاطمة علي' },
    { id: 3, name: 'محمد أحمد' }
  ])

  const products = ref([
    { id: 1, name: 'منتج 1', price: 10.0, costPrice: 8.0, stock: 100 },
    { id: 2, name: 'منتج 2', price: 25.5, costPrice: 20.0, stock: 50 },
    { id: 3, name: 'منتج 3', price: 15.75, costPrice: 12.0, stock: 75 }
  ])

  const invoices = ref<any[]>([
    {
      id: 1,
      no: 1,
      number: 'INV-001',
      date: '2024-01-15',
      customerId: 1,
      customer: { name: 'أحمد محمد' },
      paymentMethod: 'cash',
      notes: '',
      items: [{ productId: 1, unit: 'piece', quantity: 2, price: 10.0, discount: 0, total: 20.0 }],
      total: 20.0,
      status: 'draft'
    }
  ])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currentData = ref<any>({ ...getDefaultValues(SalesInvoiceStructure), items: [] })

  const invoicesForList = computed(() =>
    invoices.value.map(inv => ({
      ...inv,
      name: `${inv.number} - ${inv.customer?.name || ''}`,
      no: inv.id
    }))
  )

  const invoiceTotal = computed(() => (currentData.value.items || []).reduce((sum: number, item: any) => sum + (item.total || 0), 0))

  function getStatusLabel(status: string) {
    const labels: Record<string, string> = { draft: 'مسودة', posted: 'مُرحّلة', paid: 'مدفوعة' }
    return labels[status] || status
  }

  function selectItem(id: number | null) {
    const invoice = invoices.value.find(inv => inv.id === id) ?? ({ ...getDefaultValues(SalesInvoiceStructure), items: [] } as any)
    selectedItemId.value = invoice.id ?? null
    currentData.value = { ...invoice, items: invoice.items ? invoice.items.map((i: any) => ({ ...i })) : [] }
  }

  function newInvoice() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    const nextNumber = `INV-${String(invoices.value.length + 1).padStart(3, '0')}`
    selectedItemId.value = null
    currentData.value = { ...getDefaultValues(SalesInvoiceStructure), number: nextNumber, items: [] }
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
    invoices.value[index].postedDate = new Date().toISOString().split('T')[0]
    currentData.value.status = 'posted'
    return true
  }

  const salesItemsColumns = computed(() => [
    {
      field: 'productId',
      label: 'المنتج',
      type: 'select',
      placeholder: 'اختر المنتج',
      trigger: true,
      options: products.value.map(p => ({ label: p.name, value: p.id })),
      width: '160px'
    },
    {
      field: 'unit',
      label: 'الوحدة',
      type: 'select',
      default: 'piece',
      options: [
        { label: 'قطعة', value: 'piece' },
        { label: 'كيلو', value: 'kg' },
        { label: 'صندوق', value: 'box' }
      ],
      width: '90px'
    },
    {
      field: 'quantity',
      label: 'الكمية',
      type: 'input',
      inputType: 'number',
      step: '0.01',
      min: 0,
      default: null,
      width: '75px',
      align: 'center'
    },
    {
      field: 'price',
      label: 'السعر',
      type: 'input',
      inputType: 'number',
      step: '0.01',
      min: 0,
      default: null,
      width: '85px',
      align: 'center'
    },
    {
      field: 'discount',
      label: 'الخصم',
      type: 'input',
      inputType: 'number',
      step: '0.01',
      min: 0,
      default: null,
      width: '75px',
      align: 'center'
    },
    {
      field: 'total',
      label: 'الإجمالي',
      type: 'display',
      bold: true,
      align: 'center',
      width: '85px',
      format: (_val: any, row: any) => {
        const qty = parseFloat(row.quantity) || 0
        const price = parseFloat(row.price) || 0
        const discount = parseFloat(row.discount) || 0
        return Math.max(0, qty * price - discount).toFixed(2)
      }
    }
  ])

  // Auto-fill price when product is selected
  watch(
    () => currentData.value.items,
    (items: any[]) => {
      if (!items) return
      items.forEach(item => {
        if (item.productId && (item.price === null || item.price === undefined || item.price === '')) {
          const product = products.value.find(p => p.id == item.productId)
          if (product) item.price = product.price
        }
      })
    },
    { deep: true }
  )

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
    salesItemsColumns,
    selectItem,
    newInvoice,
    editInvoice,
    saveInvoice,
    cancelEdit,
    confirmDeleteSelected,
    postInvoice,
    init
  }
})

