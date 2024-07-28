export interface IJob {
  id: number
  inspectionId: number
  name: string
  status: string
}

export interface ICreateJob extends Omit<IJob, 'id'> {}

export interface IUpdateJob extends Partial<ICreateJob> {}
