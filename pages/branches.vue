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
import { onMounted, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { injectToast } from '~/composables/useToast'
const branchesStore = useBranchesStore()
const { branches, branchSelectedId, branchViewMode, branchData } = storeToRefs(branchesStore)

const { addToast } = injectToast()
const showMessage = inject('showMessage')
const selectBranch = (id) => branchesStore.selectBranch(id)
const newBranch = () => branchesStore.newBranch()
const editBranch = () => branchesStore.editBranch()
const cancelBranchEdit = () => branchesStore.cancelBranchEdit()

const saveBranch = () => {
  const res = branchesStore.saveBranch()
  addToast(res.type === 'updated' ? 'تم تحديث الفرع بنجاح' : 'تم إضافة الفرع بنجاح', 'success')
}

const deleteBranch = () => {
  if (!branchSelectedId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف الفرع «${branchData.value.name}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: () => {
      const ok = branchesStore.confirmDeleteSelected()
      if (ok) addToast('تم حذف الفرع بنجاح', 'success')
    }
  })
}

onMounted(() => {
  branchesStore.init()
})
</script>
