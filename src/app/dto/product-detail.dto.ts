export interface ProductDetailDTO {
    id?: string;
    name: string;
    img: string | File;
    slug?: string;
    manufacturer: string;
    model: string;
    weight?: string;
    storage?: string;
    available?: boolean;
    stock: number;
    brand: string;
    front_camera?: string;
    rear_camera?: string;
    display?: string;
    sku?: string;
    size?: any[];
    processor?: string;
    category: string;
    wlan?: string;
    sim?: string;
    memory?: string;
    description: string;
    platform?: string;
    connectivity?: string;
    bluetooth?: string;
    line?: string;
    colour: any[];
    price: number;
    battery?: string;
  }

  export const mapProductDetailDTO = (data: any): ProductDetailDTO => ({
    id: data.id ?? undefined,
    name: data.name ?? undefined,
    img: data.img ?? undefined,
    slug: data.slug ?? undefined,
    manufacturer: data.manufacturer ?? undefined,
    model: data.model ?? undefined,
    weight: data.weight ?? undefined,
    storage: data.storage ?? undefined,
    available: data.available ?? undefined,
    stock: data.stock ?? undefined,
    brand: data.brand ?? undefined,
    front_camera: data.front_camera ?? undefined,
    rear_camera: data.rear_camera ?? undefined,
    display: data.display ?? undefined,
    sku: data.sku ?? undefined,
    size: data.size ?? undefined,
    processor: data.processor ?? undefined,
    category: data.category ?? undefined,
    wlan: data.wlan ?? undefined,
    sim: data.sim ?? undefined,
    memory: data.memory ?? undefined,
    description: data.description ?? undefined,
    platform: data.platform ?? undefined,
    connectivity: data.connectivity ?? undefined,
    bluetooth: data.bluetooth ?? undefined,
    line: data.line ?? undefined,
    colour: data.colour ?? undefined,
    price: data.price ?? undefined,
    battery: data.battery ?? undefined,
});

export const ERROR_MESSAGES = {
    FETCH_FAILED: 'Failed to fetch product',
};