// src/services/rtkBaseQuery.ts
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import ProductService from './product.service';

export const rtkBaseQuery: BaseQueryFn<
  void,
  unknown,
  { message: string }
> = async () => {
  try {
    const result = await ProductService.getProductList();
    return { data: result.data };
  } catch (error: any) {
    return {
      error: {
        message: error.response?.data?.error || 'Network error',
      },
    };
  }
};