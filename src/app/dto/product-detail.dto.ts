export interface ProductDetailDTO {
    id: string;
    name: string;
    img: string;
    slug: string;
    manufacturer: string;
    model: string;
    weight: string;
    storage: string;
    available: boolean;
    stock: number;
    brand: string;
    frontCamera: string;
    rearCamera: string;
    display: string;
    sku: string;
    size: string;
    processor: string;
    category: string;
    wlan: string;
    sim: string;
    memory: string;
    description: string;
    platform: string;
    connectivity: string;
    bluetooth: string;
    line: string;
    colour: string;
    price: number;
    battery: string;
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
    frontCamera: data.front_camera ?? undefined,
    rearCamera: data.rear_camera ?? undefined,
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
// export class ProductDetailDTO{
//     public id: string = '';
//     public name: string = '';
//     public img: string = '';
//     public slug: string = '';
//     public manufacturer: string = '';
//     public model: string = '';
//     public weight: string = '';
//     public storage: string = '';
//     public available: boolean = false;
//     public stock: number = 0;
//     public brand: string = '';
//     public frontCamera: string = '';
//     public rearCamera: string = '';
//     public display: string = '';
//     public sku: string = '';
//     public size: string = '';
//     public processor: string = '';
//     public category: string = '';
//     public wlan: string = '';
//     public sim: string = '';
//     public memory: string = '';
//     public description: string = '';
//     public platform: string = '';
//     public connectivity: string = '';
//     public bluetooth: string = '';
//     public line: string = '';
//     public colour: string = '';
//     public price: number = 0;
//     public battery: string = '';
    
//     public mapData(data:any):ProductDetail {
//         return {
//             id: data.id ?? '',
//             name: data.name ?? '',
//             img: data.img ?? '',
//             slug: data.slug ?? '',
//             manufacturer: data.manufacturer ?? '',
//             model: data.model ?? '',
//             weight: data.weight ?? '',
//             storage: data.storage ?? '',
//             available: data.available ?? false,
//             stock: data.stock ?? 0,
//             brand: data.brand ?? '',
//             frontCamera: data.front_camera ?? '',
//             rearCamera: data.rear_camera ?? '',
//             display: data.display ?? '',
//             sku: data.sku ?? '',
//             size: data.size ?? '',
//             processor: data.processor ?? '',
//             category: data.category ?? '',
//             wlan: data.wlan ?? '',
//             sim: data.sim ?? '',
//             memory: data.memory ?? '',
//             description: data.description ?? '',
//             platform: data.platform ?? '',
//             connectivity: data.connectivity ?? '',
//             bluetooth: data.bluetooth ?? '',
//             line: data.line ?? '',
//             colour: data.colour ?? '',
//             price: data.price ?? 0,
//             battery: data.battery ?? '',
//         }
//     }
    
//     }
    // public mapData = (data:any)=>{
    //     if(data){
    //         this.available = data?.available
    //         this.frontCamera = data?.frontCamera
    //         this.size = data?.size
    //         this.processor = data?.processor
    //         this.brand = data?.brand
    //         this.weight = data?.weight
    //         this.slug = data?.storage
    //         this.name = data?.name
    //         this.manufacturer = data?.manufacturer
    //         this.img = data?.img
    //         this.colour = data?.colour
    //         this.description = data?.description
    //         this.bluetooth = data?.bluetooth
    //         this.category = data?.category
    //         this.connectivity = data?.connectivity
    //         this.display = data?.display
    //         this.frontCamera = data?.front_camera
    //         this.id = data?.id
    //         this.line = data?.line
    //         this.memory = data?.memory
    //         this.model = data?.model
    //         this.platform = data?.platform
    //         this.processor = data?.processor
    //         this.rearCamera = data?.rear_camera
    //         this.sim = data?.sim
    //         this.size = data?.size
    //         this.sku = data?.sku
    //         this.storage = data?.storage
    //         this.stuck = data?.stuck
    //         this.weight = data?.weight
    //         this.wlan = data?.wlan
    //         this.price = data?.price
    //         this.battery = data?.battery;
    //         this.stock = data?.stock
    //     }
    // }


export const ERROR_MESSAGES = {
    FETCH_FAILED: 'Failed to fetch product',
};