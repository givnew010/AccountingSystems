import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useReportsStore = defineStore('reports', () => {
  const activeTab = ref<'sales' | 'inventory'>('sales')

  const salesFilters = ref({ startDate: '', endDate: '', customerId: '', status: 'all' as 'all' | 'posted' | 'paid' })
  const salesReportData = ref<any[]>([])
  const salesReportTotals = ref({ total: 0 })

  const inventoryFilters = ref({ categoryId: '', productId: '', stockStatus: 'all' as 'all' | 'in-stock' | 'low-stock' | 'out-of-stock' })
  const inventoryReportData = ref<any[]>([])
  const inventoryReportTotals = ref({ totalValue: 0, totalItems: 0 })

  // lookups + mock data
  const customers = ref([
    { id: 1, name: 'أحمد محمد' },
    { id: 2, name: 'فاطمة علي' },
    { id: 3, name: 'محمد أحمد' }
  ])

  const categories = ref([
    { id: 1, name: 'أدوات مكتبية' },
    { id: 2, name: 'إلكترونيات' },
    { id: 3, name: 'أثاث' }
  ])

  const products = ref<any[]>([
    { id: 1, name: 'قلم حبر', categoryId: 1, category: { name: 'أدوات مكتبية' }, units: [{ name: 'قطعة', purchasePrice: 3, currentQuantity: 100 }] },
    { id: 2, name: 'ورق A4', categoryId: 1, category: { name: 'أدوات مكتبية' }, units: [{ name: 'رزمة', purchasePrice: 18, currentQuantity: 50 }] },
    { id: 3, name: 'كرسي مكتبي', categoryId: 3, category: { name: 'أثاث' }, units: [{ name: 'قطعة', purchasePrice: 150, currentQuantity: 25 }] }
  ])

  const salesInvoices = ref<any[]>([
    { id: 1, number: 'INV-2024-001', date: '2024-01-15', customerId: 1, customer: { name: 'أحمد محمد' }, total: 330.0, status: 'posted' },
    { id: 2, number: 'INV-2024-002', date: '2024-01-20', customerId: 2, customer: { name: 'فاطمة علي' }, total: 180.0, status: 'paid' },
    { id: 3, number: 'INV-2024-003', date: '2024-01-25', customerId: 1, customer: { name: 'أحمد محمد' }, total: 450.0, status: 'posted' }
  ])

  const filteredProducts = computed(() => {
    if (!inventoryFilters.value.categoryId) return products.value
    return products.value.filter(p => p.categoryId == inventoryFilters.value.categoryId)
  })

  function generateSalesReport() {
    let filtered = salesInvoices.value
    if (salesFilters.value.startDate) filtered = filtered.filter(inv => inv.date >= salesFilters.value.startDate)
    if (salesFilters.value.endDate) filtered = filtered.filter(inv => inv.date <= salesFilters.value.endDate)
    if (salesFilters.value.customerId) filtered = filtered.filter(inv => inv.customerId == salesFilters.value.customerId)
    if (salesFilters.value.status !== 'all') filtered = filtered.filter(inv => inv.status === salesFilters.value.status)
    salesReportData.value = filtered
    salesReportTotals.value.total = filtered.reduce((sum, inv) => sum + inv.total, 0)
  }

  function getStockStatus(quantity: number) {
    if (quantity === 0) return 'out-of-stock'
    if (quantity <= 10) return 'low-stock'
    return 'in-stock'
  }

  function generateInventoryReport() {
    const filtered: any[] = []
    products.value.forEach(product => {
      product.units.forEach((unit: any) => {
        const item = {
          id: `${product.id}-${unit.name}`,
          product,
          unit,
          currentQuantity: unit.currentQuantity,
          purchasePrice: unit.purchasePrice
        }
        if (inventoryFilters.value.categoryId && product.categoryId != inventoryFilters.value.categoryId) return
        if (inventoryFilters.value.productId && product.id != inventoryFilters.value.productId) return
        if (inventoryFilters.value.stockStatus !== 'all' && getStockStatus(item.currentQuantity) !== inventoryFilters.value.stockStatus) return
        filtered.push(item)
      })
    })
    inventoryReportData.value = filtered
    inventoryReportTotals.value = {
      totalValue: filtered.reduce((sum, item) => sum + item.currentQuantity * item.purchasePrice, 0),
      totalItems: filtered.length
    }
  }

  function getStockStatusText(quantity: number) {
    const status = getStockStatus(quantity)
    const labels: Record<string, string> = { 'in-stock': 'متوفر', 'low-stock': 'منخفض', 'out-of-stock': 'نفد' }
    return labels[status]
  }

  function getStockStatusClass(quantity: number) {
    const status = getStockStatus(quantity)
    const classes: Record<string, string> = {
      'in-stock': 'bg-green-100 text-green-800',
      'low-stock': 'bg-yellow-100 text-yellow-800',
      'out-of-stock': 'bg-red-100 text-red-800'
    }
    return classes[status]
  }

  return {
    activeTab,
    salesFilters,
    salesReportData,
    salesReportTotals,
    inventoryFilters,
    inventoryReportData,
    inventoryReportTotals,
    customers,
    categories,
    products,
    salesInvoices,
    filteredProducts,
    generateSalesReport,
    generateInventoryReport,
    getStockStatusText,
    getStockStatusClass
  }
})

