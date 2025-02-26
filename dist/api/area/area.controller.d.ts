import { AreaEntity } from './entities/area.entity';
import { AreaService } from './area.service';
export declare class AreaController {
    private readonly areaService;
    constructor(areaService: AreaService);
    getDataByPidApi(pid: number): Promise<AreaEntity[]>;
    getAllCityApi(): Promise<AreaEntity[]>;
}
