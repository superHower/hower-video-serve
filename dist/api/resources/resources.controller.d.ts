import { ICurrentUserType } from '@src/decorators';
import { ResourcesDto } from './dto/resources.dto';
import { QueryResourcesDto } from './dto/resources.query.dto';
import { ResourcesService } from './resources.service';
import { ResourcesListVo, SimplenessResourceVo } from './vo/resources.vo';
export declare class ResourcesController {
    private readonly resourcesService;
    constructor(resourcesService: ResourcesService);
    createResourceApi(resourcesDto: ResourcesDto): Promise<string>;
    deleteResourceByIdApi(id: number): Promise<string>;
    modifyResourceByIdApi(id: number, resourcesDto: ResourcesDto): Promise<string>;
    getResourcePageApi(queryResourcesDto: QueryResourcesDto): Promise<ResourcesListVo>;
    getResourceCatalogApi(catalogType: number): Promise<SimplenessResourceVo[]>;
    getResourcesListApi(type: number, currentInfo: ICurrentUserType): Promise<SimplenessResourceVo[]>;
    getMenusByCatalogIdApi(id: number): Promise<SimplenessResourceVo[]>;
}
