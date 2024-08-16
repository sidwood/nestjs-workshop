export type Task = {
  id: string
  title: string
  isDone: boolean
  completedAt: Date | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
