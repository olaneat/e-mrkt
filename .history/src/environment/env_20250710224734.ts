export const env = {
    BASE_URL: 'http://localhost:8000' as string,
    IMG_URL: import.meta.env.VITE_IMG_URL as string, 
    TEST_PK: import.meta.env.VITE_TEST_PK as string,
    TEST_SK: import.meta.env.VITE_TEST_SK as string,
    DEBUG_MODE: import.meta.env.VITE_DEBUG_MODE === 'true',  
}

export default env