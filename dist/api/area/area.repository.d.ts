import { Repository } from 'typeorm';
import { AreaEntity } from './entities/area.entity';
export declare class AreaRepository {
    private readonly areaRepository;
    constructor(areaRepository: Repository<AreaEntity>);
    getFullAddressByCityId(cityId: number, address?: string): Promise<string>;
}
