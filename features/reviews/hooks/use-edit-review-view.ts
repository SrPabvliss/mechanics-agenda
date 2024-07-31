import { ReviewAdapter } from '../adapters/reviewAdapter'
import { useIndividualReviewQuery } from './use-reviews-query'

const useEditReviewView = ({ id }: { id: string }) => {
  const { data, isLoading, isFetching } = useIndividualReviewQuery(+id)

  if (!data) {
    return {
      review: null,
    }
  }

  return {
    review: ReviewAdapter.individualAdapter(data),
    isLoading,
    isFetching,
  }
}

export default useEditReviewView
