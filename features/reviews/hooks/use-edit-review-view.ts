import { ReviewAdapter } from '../adapters/reviewAdapter'
import { useIndividualReviewQuery } from './use-reviews-query'

const useEditReviewView = ({ id }: { id: string }) => {
  const { data } = useIndividualReviewQuery(id)

  if (!data) {
    return {
      review: null,
    }
  }

  return {
    review: ReviewAdapter.individualAdapter(data),
  }
}

export default useEditReviewView
