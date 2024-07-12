import { reviewData } from '../models/IApiReview'

const useActivityView = ({ id }: { id: string }) => {
  const review = reviewData.find((item) => item.id === id)

  return {
    review,
  }
}

export default useActivityView
