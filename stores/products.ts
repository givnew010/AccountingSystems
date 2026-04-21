import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const ProductStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  barcode: { type: String, default: '' },
  categoryId: { type: [Number, String], default: '' },
  warehouseId: { type: [Number, String], default: '' },
  status: { type: String, default: 'active' },
  units: { type: Array, default: [] }
}

export const useProductsStore = defineStore('products', () => {
  // lookups (mock)
  const categories = ref([
    { id: 1, name: 'أجهزة كمبيوتر' },
    { id: 2, name: 'ملحقات' },
    { id: 3, name: 'أثاث مكتبي' }
  ])

  const warehouses = ref([
    { id: 1, name: 'المستودع الرئيسي' },
    { id: 2, name: 'فرع الشمال' }
  ])

  const availableUnits = ref([
    { id: 1, name: 'قطعة' },
    { id: 2, name: 'علبة' },
    { id: 3, name: 'كيلو جرام' },
    { id: 4, name: 'لتر' }
  ])

  // entities (mock)
  const products = ref([
    {
      id: 1,
      no: 1,
      name: 'لابتوب ديل',
      barcode: '123456789',
      categoryId: 1,
      warehouseId: 1,
      status: 'active',
      units: [
        {
          unitId: 1,
          type: 'base',
          conversionRate: 1,
          salePrice: 5000,
          purchasePrice: 4500,
          costPrice: 4000,
          currentQuantity: 10
        }
      ]
    },
    {
      id: 2,
      no: 2,
      name: 'ماوس لاسلكي',
      barcode: '987654321',
      categoryId: 2,
      warehouseId: 1,
      status: 'active',
      units: [
        {
          unitId: 2,
          type: 'base',
          conversionRate: 1,
          salePrice: 150,
          purchasePrice: 120,
          costPrice: 100,
          currentQuantity: 50
        }
      ]
    },
    {
      id: 3,
      no: 3,
      name: 'كرسي مكتبي',
      barcode: '',
      categoryId: 3,
      warehouseId: 1,
      status: 'inactive',
      units: [
        {
          unitId: 1,
          type: 'base',
          conversionRate: 1,
          salePrice: 800,
          purchasePrice: 600,
          costPrice: 500,
          currentQuantity: 5
        }
      ]
    }
  ])

  // ui state
  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currentData = ref<any>({ ...getDefaultValues(ProductStructure), units: [] })

  const productsForList = computed(() => products.value.map(p => ({ ...p })))
  const categoryOptions = computed(() => categories.value.map(c => ({ label: c.name, value: c.id })))

  const unitsColumns = computed(() => [
    {
      field: 'unitId',
      label: 'الوحدة',
      type: 'select',
      placeholder: 'اختر',
      trigger: true,
      options: availableUnits.value.map(u => ({ label: u.name, value: u.id })),
      width: '130px'
    },
    {
      field: 'type',
      label: 'النوع',
      type: 'select',
      default: 'base',
      options: [
        { label: 'أساسية', value: 'base' },
        { label: 'مشتقة', value: 'derived' }
      ],
      width: '100px'
    },
    {
      field: 'conversionRate',
      label: 'معامل التحويل',
      type: 'input',
      inputType: 'number',
      step: '0.01',
      min: 0,
      default: 1,
      width: '100px',
      align: 'center'
    },
    {
      field: 'salePrice',
      label: 'سعر البيع',
      type: 'input',
      inputType: 'number',
      step: '0.01',
      min: 0,
      default: 0,
      width: '90px',
      align: 'center'
    },
    {
      field: 'purchasePrice',
      label: 'سعر الشراء',
      type: 'input',
      inputType: 'number',
      step: '0.01',
      min: 0,
      default: 0,
      width: '90px',
      align: 'center'
    },
    {
      field: 'currentQuantity',
      label: 'الكمية',
      type: 'input',
      inputType: 'number',
      step: '0.01',
      min: 0,
      default: 0,
      width: '80px',
      align: 'center'
    }
  ])

  function selectItem(id: number | null) {
    const product =
      products.value.find(p => p.id === id) ?? ({ ...getDefaultValues(ProductStructure), units: [] } as any)
    selectedItemId.value = product.id ?? null
    currentData.value = {
      ...product,
      units: product.units ? product.units.map((u: any) => ({ ...u })) : []
    }
  }

  function newProduct() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    selectItem(-1 as any)
  }

  function editProduct() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveProduct(): { type: 'created' | 'updated'; id: number } {
    if (selectedItemId.value) {
      const index = products.value.findIndex(p => p.id === selectedItemId.value)
      if (index > -1) {
        products.value[index] = { ...currentData.value, id: selectedItemId.value }
        isViewMode.value = true
        selectItem(products.value[index].id)
        return { type: 'updated', id: products.value[index].id }
      }
    }

    const newId = Math.max(...products.value.map(p => p.id), 0) + 1
    const created = { ...currentData.value, id: newId, no: newId }
    products.value.push(created)
    isViewMode.value = true
    selectItem(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelEdit() {
    isViewMode.value = true
    selectItem(lastSelectedItemId.value)
  }

  function confirmDeleteSelected(): boolean {
    const index = products.value.findIndex(p => p.id === currentData.value?.id)
    if (index <= -1) return false

    products.value.splice(index, 1)
    const nextId =
      (index >= 0 && index < products.value.length ? products.value[index].id : null) ??
      (index === products.value.length ? products.value[index - 1]?.id : null) ??
      null
    selectItem(nextId)
    return true
  }

  function init() {
    isViewMode.value = true
    selectItem(products.value[0]?.id ?? (-1 as any))
  }

  return {
    // state
    categories,
    warehouses,
    availableUnits,
    products,
    selectedItemId,
    lastSelectedItemId,
    isViewMode,
    currentData,

    // getters
    productsForList,
    categoryOptions,
    unitsColumns,

    // actions
    selectItem,
    newProduct,
    editProduct,
    saveProduct,
    cancelEdit,
    confirmDeleteSelected,
    init
  }
})

