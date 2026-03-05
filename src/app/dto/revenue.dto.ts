export interface RevenueAnalysisDTO{
    overall_total: number;
    data: RevenueBreakdown[];
    period: string
}


export interface RevenueBreakdown{
    date: string;
    revenue:number
}



export const ERROR_MESSAGES = {
    FETCH_FAILED: 'Failed to fetch categories', // Updated for categories
  };