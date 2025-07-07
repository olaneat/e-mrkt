export interface ProfileDTO{
    first_name:string;
    last_name:string;
    phone_number:string;
    state:string;
    lga:string;
    address:string;
    id:string;
    username: string

}


export const mapProfileDTO = (data:any): ProfileDTO => ({
    id:data.uuid ?? undefined,
    first_name: data?.first_name ?? undefined,
    last_name: data?.last_name ?? undefined,
    lga: data?.lga ?? undefined,
    state: data?.state ?? undefined,
    phone_number:data?.phone_number ?? undefined,
    username: data?.username ?? undefined,
    address: data?.address ?? undefined
}) 

export const ERROR_MESSAGES = {
    FETCH_FAILED: 'Failed to fetch product',
}

