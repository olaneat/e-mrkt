interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_IMG_URL: string;
  readonly VITE_TEST_PK: string;
  readonly VITE_TEST_SK: string;
  readonly VITE_DEBUG_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}