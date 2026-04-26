export interface TaskItem {
  id: number
  no: number
  name: string
  description: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'in_progress' | 'completed'
  dueDate: string
  createdAt: string
}

export const taskList: TaskItem[] = [
  {
    id: 1,
    no: 1,
    name: 'إعداد التقرير الشهري',
    description: 'تجهيز تقرير المبيعات للشهر الحالي ومراجعة الأرقام مع المحاسب.',
    priority: 'high',
    status: 'in_progress',
    dueDate: '2026-05-05',
    createdAt: '2026-04-20'
  },
  {
    id: 2,
    no: 2,
    name: 'مراجعة طلبات الموردين',
    description: 'متابعة الطلبات المعلقة وتأكيد مواعيد التسليم.',
    priority: 'medium',
    status: 'pending',
    dueDate: '2026-04-30',
    createdAt: '2026-04-21'
  },
  {
    id: 3,
    no: 3,
    name: 'جرد المخزون',
    description: 'إجراء جرد دوري للمستودع الرئيسي وتحديث الكميات.',
    priority: 'high',
    status: 'pending',
    dueDate: '2026-05-10',
    createdAt: '2026-04-22'
  },
  {
    id: 4,
    no: 4,
    name: 'تحديث بيانات العملاء',
    description: 'مراجعة وتحديث أرقام التواصل والعناوين للعملاء النشطين.',
    priority: 'low',
    status: 'completed',
    dueDate: '2026-04-23',
    createdAt: '2026-04-15'
  },
  {
    id: 5,
    no: 5,
    name: 'تدريب الموظفين الجدد',
    description: 'جلسة تعريفية حول استخدام نظام المحاسبة.',
    priority: 'medium',
    status: 'in_progress',
    dueDate: '2026-04-28',
    createdAt: '2026-04-18'
  }
]

export default taskList
