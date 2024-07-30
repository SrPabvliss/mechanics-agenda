export enum JOB_STATUS {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
}

export interface IJob {
  id: number
  inspectionId: number
  name: string
  status: JOB_STATUS
}

export interface ICreateJob extends Omit<IJob, 'id'> {}

export interface IUpdateJob extends Partial<ICreateJob> {}
