export interface IReviews {
  [key: string]: IReview[]
}

export interface IReview {
  id: string
  car: string
  owner: string
  plate: string
  color: string
  hour: string
  status: 'pending' | 'completed'
}
