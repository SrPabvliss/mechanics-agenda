export interface IFilter {
  startDate?: string
  endDate?: string
}

export interface IQuoteFilter extends IFilter {
  status?: string
  userCI?: string
  clientName?: string
  vehicleDescription?: string
}

export interface IAdminQuoteFilter extends IFilter {}

export interface IReviewFilter extends IFilter {}
