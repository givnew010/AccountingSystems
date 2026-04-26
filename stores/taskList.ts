import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDefaultValues } from '~/composables/helper'
import { taskList as initialTaskList, type TaskItem } from '~/data/taskList'

const TaskStructure = {
  id: { type: Number, default: null },
  no: { type: Number, default: null },
  name: { type: String, default: '' },
  description: { type: String, default: '' },
  priority: { type: String, default: 'medium' },
  status: { type: String, default: 'pending' },
  dueDate: { type: String, default: '' },
  createdAt: { type: String, default: '' }
}

export const useTaskListStore = defineStore('taskList', () => {
  const tasks = ref<TaskItem[]>([...initialTaskList])

  const selectedItemId = ref<number | null>(null)
  const lastSelectedItemId = ref<number | null>(null)
  const isViewMode = ref(true)
  const currentData = ref<any>({ ...getDefaultValues(TaskStructure) })

  function selectItem(id: number | null) {
    const task = tasks.value.find(t => t.id === id) ?? ({ ...getDefaultValues(TaskStructure) } as any)
    selectedItemId.value = task.id ?? null
    currentData.value = { ...task }
  }

  function newTask() {
    isViewMode.value = false
    lastSelectedItemId.value = selectedItemId.value
    selectItem(-1 as any)
    currentData.value.createdAt = new Date().toISOString().slice(0, 10)
    currentData.value.status = 'pending'
    currentData.value.priority = 'medium'
  }

  function editTask() {
    if (selectedItemId.value) {
      isViewMode.value = false
      lastSelectedItemId.value = selectedItemId.value
    }
  }

  function saveTask(): { type: 'created' | 'updated'; id: number } {
    if (selectedItemId.value) {
      const index = tasks.value.findIndex(t => t.id === selectedItemId.value)
      if (index > -1) {
        tasks.value[index] = { ...tasks.value[index], ...currentData.value, id: selectedItemId.value }
        isViewMode.value = true
        selectItem(tasks.value[index].id)
        return { type: 'updated', id: tasks.value[index].id }
      }
    }

    const newId = Math.max(...tasks.value.map(t => t.id), 0) + 1
    const newNo = Math.max(...tasks.value.map(t => t.no), 0) + 1
    const created: TaskItem = {
      ...currentData.value,
      id: newId,
      no: newNo,
      createdAt: currentData.value.createdAt || new Date().toISOString().slice(0, 10)
    }
    tasks.value.push(created)
    isViewMode.value = true
    selectItem(created.id)
    return { type: 'created', id: created.id }
  }

  function cancelEdit() {
    isViewMode.value = true
    selectItem(lastSelectedItemId.value)
  }

  function confirmDeleteSelected(): boolean {
    const index = tasks.value.findIndex(t => t.id === currentData.value?.id)
    if (index <= -1) return false
    tasks.value.splice(index, 1)
    const nextId =
      (index >= 0 && index < tasks.value.length ? tasks.value[index].id : null) ??
      (index === tasks.value.length ? tasks.value[index - 1]?.id : null) ??
      null
    selectItem(nextId)
    return true
  }

  function toggleComplete(id: number) {
    const task = tasks.value.find(t => t.id === id)
    if (!task) return
    task.status = task.status === 'completed' ? 'pending' : 'completed'
    if (selectedItemId.value === id) {
      currentData.value = { ...task }
    }
  }

  function init() {
    isViewMode.value = true
    selectItem(tasks.value[0]?.id ?? (-1 as any))
  }

  return {
    tasks,
    selectedItemId,
    lastSelectedItemId,
    isViewMode,
    currentData,
    selectItem,
    newTask,
    editTask,
    saveTask,
    cancelEdit,
    confirmDeleteSelected,
    toggleComplete,
    init
  }
})
