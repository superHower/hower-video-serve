import { BaseEntity } from 'typeorm';
export declare class AreaEntity extends BaseEntity {
    id: number;
    pid: number;
    shortname: string;
    name: string;
    mergerName: string;
    level: number;
    pinyin: string;
    code: string;
    zipCode: string;
    first: string;
    lng: string;
    lat: string;
}
