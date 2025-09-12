export interface CategoryDTO {
    name?: string;
    slug?: string;
    id?: string;
    img?: string;
  }
  
  export const mapCategoryDTO = (data: any): CategoryDTO => ({
    id: data.id ?? undefined,
    name: data.name ?? undefined,
    img: data.img ?? undefined,
    slug: data.slug ?? undefined,
  });

  export const mapCategoryListDTO = (data: any): CategoryDTO[] => {
    const mapped = Array.isArray(data)
      ? data.map((item) => mapCategoryDTO(item))
      : [];
    // Debug: Log mapped data (development only)
    // if (process.env.NODE_ENV === 'development') {
    // }
    return mapped;
  };
  export const ERROR_MESSAGES = {
    FETCH_FAILED: 'Failed to fetch categories', // Updated for categories
  };
  