import { AreaEntity } from './entities/area.entity';
import { Repository } from 'typeorm';
export declare class AreaService {
    private readonly areaRepository;
    constructor(areaRepository: Repository<AreaEntity>);
    getDataByPidApi(pid: number): Promise<AreaEntity[]>;
    getAllCityApi(): Promise<AreaEntity[]>;
}
