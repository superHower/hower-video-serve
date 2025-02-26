import { ICurrentUserType } from '@src/decorators';
import { Repository } from 'typeorm';
import { MenusRepository } from '../menus/menus.repository';
import { ResourcesDto } from './dto/resources.dto';
import { QueryResourcesDto } from './dto/resources.query.dto';
import { ResourcesEntity } from './entities/resources.entity';
import { ResourcesListVo, SimplenessResourceVo } from './vo/resources.vo';
export declare class ResourcesService {
    private readonly resourcesRepository;
    private readonly menusRepository;
    constructor(resourcesRepository: Repository<ResourcesEntity>, menusRepository: MenusRepository);
    createResourceApi(resourcesDto: ResourcesDto): Promise<string>;
    deleteResourceByIdApi(id: number): Promise<string>;
    modifyResourceByIdApi(id: number, resourcesDto: ResourcesDto): Promise<string>;
    getResourcePageApi(queryResourcesDto: QueryResourcesDto): Promise<ResourcesListVo>;
    getResourceCatalogApi(catalogType: number): Promise<SimplenessResourceVo[]>;
    getResourcesListApi(type: number, currentInfo: ICurrentUserType): Promise<SimplenessResourceVo[]>;
    getMenusByCatalogIdApi(id: number): Promise<SimplenessResourceVo[]>;
}
