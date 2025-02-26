export interface IPAddress {
    nation: string;
    province: string;
    city: string;
    district: string;
    adcode: string;
}
export declare class IpToAddressService {
    getAddress(ip: string): Promise<IPAddress>;
}
