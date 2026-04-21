<template>
  <div class="min-h-screen bg-gray-100 overflow-hidden">
    <div class="flex flex-row h-screen">
      <ListSection title="المنتجات" :items="productsForList" search-placeholder="البحث في المنتجات..."
        :disabled="!isViewMode" :selectedItemId="selectedItemId" @select-item="selectItem" />

      <div class="flex-1 m-2 bg-white p-5 rounded-lg overflow-auto">
        <ActionButtons :isViewMode="isViewMode" :editDisabled="!selectedItemId"
          :deleteDisabled="!selectedItemId" @new="newProduct" @edit="editProduct"
          @delete="deleteProduct" @save="saveProduct" @cancel="cancelEdit" />

        <form @submit.prevent="saveProduct" class="space-y-4 pb-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <UiLabel required :disabled="isViewMode">اسم المنتج</UiLabel>
              <UiInput v-model="currentData.name" type="text" required :disabled="isViewMode" />
            </div>
            <div>
              <UiLabel :disabled="isViewMode">الباركود</UiLabel>
              <UiInput v-model="currentData.barcode" type="text" :disabled="isViewMode" />
            </div>
            <div>
              <UiLabel :disabled="isViewMode">التصنيفات</UiLabel>
              <ComboBox
                v-model="currentData.categoryId"
                :options="categoryOptions"
                placeholder="اختر التصنيف"
                :disabled="isViewMode"
                clearable
              />
            </div>
            <div>
              <UiLabel :disabled="isViewMode">المستودع/الفرع</UiLabel>
              <UiSelect v-model="currentData.warehouseId" :disabled="isViewMode">
                <option value="">اختر المستودع</option>
                <option v-for="wh in warehouses" :key="wh.id" :value="wh.id">{{ wh.name }}</option>
              </UiSelect>
            </div>
            <div>
              <UiLabel required :disabled="isViewMode">الحالة</UiLabel>
              <UiSelect v-model="currentData.status" required :disabled="isViewMode">
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </UiSelect>
            </div>
          </div>

          <!-- Units Sub-table -->
          <div class="mt-3">
            <DynamicTable
              v-model="currentData.units"
              :columns="unitsColumns"
              :is-view-mode="isViewMode"
              :show-delete="true"
              title="وحدات القياس"
              empty-text="لا توجد وحدات مضافة"
            />
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

const productsStore = useProductsStore()
const {
  warehouses,
  selectedItemId,
  isViewMode,
  currentData,
  productsForList,
  categoryOptions,
  unitsColumns
} = storeToRefs(productsStore)

const { addToast } = injectToast()
const showMessage = inject('showMessage')

const selectItem = (id) => productsStore.selectItem(id)
const newProduct = () => productsStore.newProduct()
const editProduct = () => productsStore.editProduct()

const saveProduct = () => {
  const res = productsStore.saveProduct()
  addToast(res.type === 'updated' ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح', 'success')
}

const cancelEdit = () => productsStore.cancelEdit()

const deleteProduct = () => {
  if (!selectedItemId.value) return
  showMessage({
    title: 'تأكيد الحذف',
    message: `هل أنت متأكد من حذف المنتج «${currentData.value.name}»؟`,
    cancelText: 'إلغاء',
    confirmText: 'حذف',
    onCancel: () => {},
    onConfirm: confirmDelete
  })
}

const confirmDelete = () => {
  const ok = productsStore.confirmDeleteSelected()
  if (ok) addToast('تم حذف المنتج بنجاح', 'success')
}

onMounted(() => {
  productsStore.init()
})
</script>
