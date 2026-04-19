<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="الفروع" :items="branches" search-placeholder="البحث في الفروع..." :disabled="!branchViewMode"
        :selectedItemId="branchSelectedId" @select-item="selectBranch" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons :isViewMode="branchViewMode" :editDisabled="!branchSelectedId"
          :deleteDisabled="!branchSelectedId" @new="newBranch" @edit="editBranch" @delete="deleteBranch"
          @save="saveBranch" @cancel="cancelBranchEdit" />

        <form @submit.prevent="saveBranch" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">اسم الفرع</label>
            <input v-model="branchData.name" type="text" required :disabled="branchViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل اسم الفرع" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">العنوان</label>
            <textarea v-model="branchData.address" rows="3" required :disabled="branchViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل عنوان الفرع"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الهاتف</label>
            <input v-model="branchData.phone" type="tel" :disabled="branchViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل رقم الهاتف" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
            <input v-model="branchData.email" type="email" :disabled="branchViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="أدخل البريد الإلكتروني" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">الحالة</label>
            <select v-model="branchData.status" required :disabled="branchViewMode"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100">
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { injectToast } from '~/composables/useToast'
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

const branches = ref([
  { id: 1, no: 1, name: 'المقر الرئيسي', address: 'الرياض، المملكة العربية السعودية', phone: '+966112345678', email: 'main@company.com', status: 'active', warehousesCount: 3 },
  { id: 2, no: 2, name: 'فرع جدة', address: 'جدة، المملكة العربية السعودية', phone: '+966212345678', email: 'jeddah@company.com', status: 'active', warehousesCount: 2 },
  { id: 3, no: 3, name: 'فرع الدمام', address: 'الدمام، المملكة العربية السعودية', phone: '+966312345678', email: 'dammam@company.com', status: 'inactive', warehousesCount: 0 }
])

const { addToast } = injectToast()
const showMessage = inject('showMessage')

const branchSelectedId = ref(null)
const branchLastSelectedId = ref(null)
const branchViewMode = ref(true)
const branchData = ref({ ...getDefaultValues(BranchStructure) })

const selectBranch = (id) => {
  const branch = branches.value.find(b => b.id === id) ?? { ...getDefaultValues(BranchStructure) }
  branchSelectedId.value = branch.id ?? null
  branchData.value = { ...branch }
}

const newBranch = () => {
  branchViewMode.value = false
  branchLastSelectedId.value = branchSelectedId.value
  selectBranch(-1)
}

const editBranch = () => {
  if (branchSelectedId.value) {
    branchViewMode.value = false
    branchLastSelectedId.value = branchSelectedId.value
  }
}

const saveBranch = () => {
  if (branchSelectedId.value) {
    const index = branches.value.findIndex(b => b.id === branchSelectedId.value)
    if (index > -1) {
      branches.value[index] = { ...branchData.value, id: branchSelectedId.value }
      branchViewMode.value = true
      selectBranch(branches.value[index].id)
      addToast('تم تحديث الفرع بنجاح', 'success')
    }
  } else {
    const newId = Math.max(...branches.value.map(b => b.id)) + 1
    const newBranch = { ...branchData.value, id: newId, no: newId, warehousesCount: 0 }
    branches.value.push(newBranch)
    branchViewMode.value = true
    selectBranch(newBranch.id)
    addToast('تم إضافة الفرع بنجاح', 'success')
  }
}

const cancelBranchEdit = () => {
  branchViewMode.value = true
  selectBranch(branchLastSelectedId.value)
}

const deleteBranch = () => {
  if (!branchSelectedId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف الفرع «${branchData.value.name}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => { },
    onConfirm: () => {
      const index = branches.value.findIndex(b => b.id === branchData.value.id)
      if (index > -1) {
        branches.value.splice(index, 1)
        selectBranch(branches.value[index]?.id ?? branches.value[index - 1]?.id ?? null)
        addToast('تم حذف الفرع بنجاح', 'success')
      }
    }
  })
}

onMounted(() => {
  branchViewMode.value = true
  selectBranch(branches.value[0]?.id ?? -1)
})
</script>
