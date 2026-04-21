import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'

const BranchStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  email: { type: String, default: '' },
  status: { type: String, default: 'active' },
  warehousesCount: { type: Number, default: 0 }
}

export const useBranchesStore = defineStore('branches', () => {
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

  const branchSelectedId = ref<number | null>(null)
  const branchLastSelectedId = ref<number | null>(null)
  const branchViewMode = ref(true)
  const branchData = ref<any>({ ...getDefaultValues(BranchStructure) })

  function selectBranch(id: number | null) {
    const branch = branches.value.find(b => b.id === id) ?? ({ ...getDefaultValues(BranchStructure) } as any)
    branchSelectedId.value = branch.id ?? null
    branchData.value = { ...branch }
  }

  function newBranch() {
    branchViewMode.value = false
    branchLastSelectedId.value = branchSelectedId.value
    selectBranch(-1 as any)
  }

  function editBranch() {
    if (branchSelectedId.value) {
      branchViewMode.value = false
      branchLastSelectedId.value = branchSelectedId.value
    }
  }

  function saveBranch(): { type: 'created' | 'updated'; id: number } {
    if (branchSelectedId.value) {
      const index = branches.value.findIndex(b => b.id === branchSelectedId.value)
      if (index > -1) {
        branches.value[index] = { ...branchData.value, id: branchSelectedId.value }
        branchViewMode.value = true
        selectBranch(branches.value[index].id)
        return { type: 'updated', id: branches.value[index].id }
      }
    }

    const newId = Math.max(...branches.value.map(b => b.id), 0) + 1
    const created = { ...branchData.value, id: newId, no: newId, warehousesCount: 0 }
    branches.value.push(created)
    branchViewMode.value = true
    selectBranch(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelBranchEdit() {
    branchViewMode.value = true
    selectBranch(branchLastSelectedId.value)
  }

  function confirmDeleteSelected(): boolean {
    const index = branches.value.findIndex(b => b.id === branchData.value?.id)
    if (index <= -1) return false
    branches.value.splice(index, 1)
    selectBranch(branches.value[index]?.id ?? branches.value[index - 1]?.id ?? null)
    return true
  }

  function init() {
    branchViewMode.value = true
    selectBranch(branches.value[0]?.id ?? (-1 as any))
  }

  return {
    branches,
    branchSelectedId,
    branchLastSelectedId,
    branchViewMode,
    branchData,
    selectBranch,
    newBranch,
    editBranch,
    saveBranch,
    cancelBranchEdit,
    confirmDeleteSelected,
    init
  }
})

