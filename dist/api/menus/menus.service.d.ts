import { ICurrentUserType } from '@src/decorators';
import { Repository } from 'typeorm';
import { ResourcesEntity } from '../resources/entities/resources.entity';
import { MenusRepository } from './menus.repository';
import { ApiVo, MenusVo } from './vo/menus.vo';
export declare class MenusService {
    private readonly resourcesRepository;
    private readonly menusRepository;
    constructor(resourcesRepository: Repository<ResourcesEntity>, menusRepository: MenusRepository);
    getAllMenusApi(userInfo: ICurrentUserType): Promise<MenusVo[]>;
    getBtnByMenusUrlApi(urlName: string, userInfo: ICurrentUserType): Promise<ApiVo[]>;
    getResourcesList(userInfo: ICurrentUserType): Promise<ResourcesEntity[]>;
}
